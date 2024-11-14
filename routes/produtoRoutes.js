const express = require('express');
const { getProdutos,criarProduto,getProduto, updateProduto} = require('../controllers/produtoController');
const multer = require('../config/multerconfig');

const router = express.Router();

router.get('/produtos', getProdutos );
router.post('/cadastro', multer.single('imagem'),criarProduto);
router.get('/produto',getProduto);
router.put('/atualizar',updateProduto);
router.delete()

module.exports = router;