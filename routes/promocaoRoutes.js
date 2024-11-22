const {createPromocao} = require('../controllers/promocaoController');
const express = require('express');

const router = express.Router();

router.post('/cadastro', createPromocao);

module.exports = router;