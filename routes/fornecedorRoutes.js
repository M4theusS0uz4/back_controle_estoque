const express = require('express');
const cadastrarFornecedor = require('../controllers/fornecedorController');
const {cadastroFornecedor} = require("../controllers/fornecedorController");

const router = express.Router();

router.post('/cadastro',cadastroFornecedor);

module.exports = router;