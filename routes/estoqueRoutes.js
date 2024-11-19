const express = require('express');
const {cadastrarEstoque} = require('../controllers/estoqueController');

const router = express.Router();

router.post('/cadastro',cadastrarEstoque);

module.exports = router;