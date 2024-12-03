const express = require('express');
const {cadastrarEstoque,getAllEstoque,getAllEstoqueFun,getEstoqueByProdutoId,adicionarQuantidadeEstoque} = require('../controllers/estoqueController');

const router = express.Router();

router.post('/cadastro',cadastrarEstoque);
router.get('/produtosEstoque',getAllEstoque);
router.get('/estoques',getAllEstoqueFun);
router.get('/produto/:produtoId', getEstoqueByProdutoId);
router.put('/adicionar',adicionarQuantidadeEstoque)


module.exports = router;