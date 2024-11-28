const express = require('express');
const {getEspecificacao} = require('../controllers/especificacaoController');
const router = express.Router();


router.post('/especificacao', getEspecificacao);

module.exports = router;