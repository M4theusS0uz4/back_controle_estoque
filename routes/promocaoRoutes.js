const {createPromocao,getAllPromocao,delPromocao} = require('../controllers/promocaoController');
const express = require('express');

const router = express.Router();

router.post('/cadastro', createPromocao);
router.get('/promocoes', getAllPromocao);
router.delete('/desativar/:id', delPromocao);
module.exports = router;