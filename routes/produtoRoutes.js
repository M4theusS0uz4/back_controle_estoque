const express = require('express');
const { getProdutos } = require('../controllers/produtoController');

const router = express.Router();

router.get('/produtos', getProdutos );

module.exports = router;