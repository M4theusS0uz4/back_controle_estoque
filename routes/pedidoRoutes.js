const express = require('express');
const router = express.Router();
const {fazerPedido,relatorioVendas,getAllPedidos} = require('../controllers/pedidoController')

router.post('/realizarPedido',fazerPedido)
router.get('/relatorio',relatorioVendas)
router.get('/pedidos',getAllPedidos)
module.exports = router;