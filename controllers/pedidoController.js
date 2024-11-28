const Pedido = require('../models/Pedido');
const Estoque = require('../models/Estoque');
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

module.exports = {fazerPedido,}