const express = require('express');
const {cadastrarLote} = require('../controllers/loteController');
const router = express.Router();

router.post('/cadastro', cadastrarLote);

module.exports = router;