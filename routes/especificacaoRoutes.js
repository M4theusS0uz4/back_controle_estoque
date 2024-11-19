const express = require('express');
const {getEspecificacao} = require('../controllers/especificacaoController');
const router = express.Router();


router.get('/especificacao', getEspecificacao);

module.exports = router;