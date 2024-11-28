const Estoque = require('../models/Estoque');
const { Op } = require('sequelize');
const axios = require('axios');
const Produto = require("../models/Produto"); // Para fazer as requisições HTTP

async function cadastrarEstoque(req, res) {
    const { id_prod, quant_atual, quant_max, quant_min, cor, tamanho, tipo, genero } = req.body;
    console.log(tipo);
    try {
        // Passo 1: Buscar a especificação do produto usando os parâmetros
        const response = await axios.post('http://localhost:5000/especificacoes/especificacao', { cor, tamanho, tipo, genero });

        if (response.status === 200) {
            const especificacao = response.data; // Aqui, 'especificacao' é o objeto retornado da API

            // Passo 2: Obter o id_espec_prod da especificação
            const id_espec_prod = especificacao.id_espec_prod;

            // Passo 3: Cadastrar o estoque com a especificação encontrada
            await Estoque.create({ id_espec_prod, id_prod, quant_atual, quant_max, quant_min });
            res.status(201).json('Estoque cadastrado');
        } else {
            // Se a especificação não for encontrada
            res.status(404).json('Especificação não encontrada');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Erro ao cadastrar estoque: ' + error);
    }
}


async function getAllEstoque(req, res) {
    try {
        // Consulta para buscar os estoques com quantidade > 0 e obter apenas os ids dos produtos
        const estoques = await Estoque.findAll({
            where: {
                quant_atual: { [Op.gt]: 0 } // Apenas estoques com quantidade maior que 0
            },
            attributes: ['id_prod', 'quant_atual','id_estoque'] // Apenas os campos necessários
        });

        // Extrair todos os ids de produtos
        const idsProdutos = estoques.map(estoque => estoque.id_prod);

        if (idsProdutos.length === 0) {
            return res.status(200).json([]); // Nenhum produto encontrado
        }

        // Consulta para buscar todos os produtos com os ids extraídos
        const produtos = await Produto.findAll({
            where: {
                id_prod: { [Op.in]: idsProdutos } // Busca os produtos com ids correspondentes
            }
        }); // Retorna todos os atributos do modelo Produto por padrão

        // Mapeia para retornar produtos junto com as quantidades de estoque
        const produtosComQuantidade = estoques.map(estoque => {
            const produto = produtos.find(p => p.id_prod === estoque.id_prod);
            return {
                produto: produto ? produto.toJSON() : null, // Retorna os dados do produto, se existir
                quantidade: estoque.quant_atual,
                id_estoque: estoque.id_estoque,
            };
        });

        return res.status(200).json(produtosComQuantidade);
    } catch (erro) {
        return res.status(400).json({ error: "Erro ao retornar produtos: " + erro.message });
    }
}

async function getAllEstoqueFun(req, res) {
    try {
        // Consulta para buscar os estoques com quantidade > 0 e obter apenas os ids dos produtos
        const estoques = await Estoque.findAll({
            where: {
                quant_atual: { [Op.gt]: 0 } // Apenas estoques com quantidade maior que 0
            },
            attributes: ['id_prod', 'quant_atual','id_estoque','quant_min',] // Apenas os campos necessários
        });

        // Extrair todos os ids de produtos
        const idsProdutos = estoques.map(estoque => estoque.id_prod);
        if (idsProdutos.length === 0) {
            return res.status(200).json([]); // Nenhum produto encontrado
        }

        // Consulta para buscar todos os produtos com os ids extraídos
        const produtos = await Produto.findAll({
            where: {
                id_prod: { [Op.in]: idsProdutos } // Busca os produtos com ids correspondentes
            }
        }); // Retorna todos os atributos do modelo Produto por padrão

        // Mapeia para retornar produtos junto com as quantidades de estoque
        const produtosComQuantidade = estoques.map(estoque => {
            const produto = produtos.find(p => p.id_prod === estoque.id_prod);
            return {
                produto: produto ? produto.toJSON() : null, // Retorna os dados do produto, se existir
                quantidade: estoque.quant_atual,
                quant_min: estoque.quant_min,
                id_estoque: estoque.id_estoque,
            };
        });

        return res.status(200).json(produtosComQuantidade);
    } catch (erro) {
        return res.status(400).json({ error: "Erro ao retornar produtos: " + erro.message });
    }
}

module.exports = {cadastrarEstoque,getAllEstoque,getAllEstoqueFun};