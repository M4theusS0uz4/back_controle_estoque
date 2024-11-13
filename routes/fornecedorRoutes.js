const express = require('express');
const {cadastroFornecedor} = require("../controllers/fornecedorController");

const router = express.Router();

router.post('/cadastro',cadastroFornecedor);

module.exports = router;