const {createPromocao,getAllPromocao} = require('../controllers/promocaoController');
const express = require('express');

const router = express.Router();

router.post('/cadastro', createPromocao);
router.get('/promocoes', getAllPromocao);

module.exports = router;