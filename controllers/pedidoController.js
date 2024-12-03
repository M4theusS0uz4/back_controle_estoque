const Pedido = require('../models/Pedido');
const Estoque = require('../models/Estoque');
const Produto = require('../models/Produto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function fazerPedido(req, res) {
    const { id_user, valor_tot, id_estoque, quantidade } = req.body;

    if (!id_user) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    try {
        // Remove o prefixo 'Bearer ' do token, se existir
        const tokenValue = id_user.startsWith('Bearer ') ? id_user.slice(7, id_user.length) : id_user;

        // Decodifica o token
        const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY);

        // Obtém o id do usuário decodificado
        const id_user_back = decoded.id;
        // Verifica se o estoque existe
        const estoque = await Estoque.findOne({ where: {id_estoque:id_estoque} });
        if (!estoque) {
            return res.status(404).json({ error: "Estoque não encontrado."});
        }

        // Verifica se há quantidade suficiente no estoque
        if (estoque.quantidade < quantidade) {
            return res.status(400).json({ error: "Quantidade insuficiente no estoque." });
        }
        // Cria o pedido
        const pedido = await Pedido.create({
            id_user: id_user_back,
            valor_tot: valor_tot,
            id_estoque: id_estoque,
            quantidade: quantidade
        });
        // Atualiza a quantidade no estoque
        estoque.quant_atual -= quantidade;
        await estoque.save();

        return res.status(200).json(pedido);
    } catch (err) {
        return res.status(500).json({ error: "Erro: " + err.message});
    }
}

async function relatorioVendas(req, res) {
    try {
        // Buscar os pedidos (vendas)
        const vendas = await Pedido.findAll();
        if (vendas.length === 0) {
            return res.status(404).json({ error: "Nenhuma venda encontrada." });
        }

        // Mapear os IDs dos estoques das vendas
        const listaIds = vendas.map((venda) => venda.id_estoque);

        // Buscar os estoques correspondentes
        const estoques = await Estoque.findAll({ where: { id_estoque: listaIds } });
        if (estoques.length === 0) {
            return res.status(404).json({ error: "Nenhum estoque correspondente encontrado." });
        }

        // Mapear os IDs dos produtos dos estoques
        const id_produtos = estoques.map((estoque) => estoque.id_prod);

        // Buscar os produtos correspondentes
        const produtos = await Produto.findAll({ where: { id_prod: id_produtos } });
        if (produtos.length === 0) {
            return res.status(404).json({ error: "Nenhum produto correspondente encontrado." });
        }

        // Preparar o retorno
        const resultado = {
            vendas,
            produtos,
            estoques,
        };

        // Retornar os produtos e vendas
        return res.status(200).json(resultado);
    } catch (error) {
        console.error("Erro ao gerar relatório de vendas:", error);
        return res.status(500).json({ error: "Erro interno ao gerar o relatório de vendas." });
    }
}

async function getAllPedidos(req,res){
    try {
        const pedidos = await Pedido.findAll();
        res.status(200).json(pedidos);
    } catch (erro){
        res.status(400).json('Erro:'+erro)
    }
}

module.exports = {fazerPedido,relatorioVendas,getAllPedidos}