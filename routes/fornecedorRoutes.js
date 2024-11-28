const express = require('express');
const {cadastroFornecedor,getAllFornecedores} = require("../controllers/fornecedorController");

const router = express.Router();

router.post('/cadastro',cadastroFornecedor);
router.get('/fornecedores',getAllFornecedores);

module.exports = router;