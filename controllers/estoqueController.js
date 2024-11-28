const Estoque = require('../models/Estoque');

const axios = require('axios'); // Para fazer as requisições HTTP

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


module.exports = {cadastrarEstoque,};