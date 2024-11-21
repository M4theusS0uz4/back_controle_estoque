const express = require('express');
const { cadastrarUsuario, loginUsuario,recuperarSenha} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);
router.post('/recuperarSenha', recuperarSenha);
module.exports = router;
