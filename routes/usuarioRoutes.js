const express = require('express');
const { cadastrarUsuario, loginUsuario,recuperarSenha,cadastrarUsuarioFuncionario} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);
router.post('/login', loginUsuario);
router.post('/recuperarSenha', recuperarSenha);
router.post('/cadastrarFuncionario',cadastrarUsuarioFuncionario)
module.exports = router;
