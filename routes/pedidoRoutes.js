const express = require('express');
const router = express.Router();
const {fazerPedido} = require('../controllers/pedidoController')

router.post('/realizarPedido',fazerPedido)

module.exports = router;