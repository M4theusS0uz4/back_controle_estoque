const express = require('express');
const {cadastrarEstoque,getAllEstoque,getAllEstoqueFun} = require('../controllers/estoqueController');

const router = express.Router();

router.post('/cadastro',cadastrarEstoque);
router.get('/produtosEstoque',getAllEstoque);
router.get('/estoques',getAllEstoqueFun);

module.exports = router;