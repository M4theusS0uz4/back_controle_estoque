const Produto = require('../models/Produto');

async function getProdutos(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
}

module.exports = {getProdutos};