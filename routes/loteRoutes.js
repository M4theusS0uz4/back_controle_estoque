const express = require('express');
const {cadastrarLote} = require('../controllers/loteController');
const router = require("./produtoRoutes");

router.post('/cadastro', cadastrarLote);

module.exports = router;