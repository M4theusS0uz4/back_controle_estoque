const express = require('express');
const router = express.Router();
const {realizarEntrada, compraMovimentacao, getAllMovimentacoes} = require('../controllers/movimentacaoController');

router.post('/movimentarCompra',compraMovimentacao);
router.post('/entrada',realizarEntrada);
router.get('/movimentacoes',getAllMovimentacoes)
module.exports = router;