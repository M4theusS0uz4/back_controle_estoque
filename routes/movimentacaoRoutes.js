const express = require('express');
const router = express.Router();
const {realizarEntrada, compraMovimentacao} = require('../controllers/movimentacaoController');

router.post('/movimentarCompra',compraMovimentacao);
router.post('/entrada',realizarEntrada);

module.exports = router;