const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
require ('dotenv').config();

async function buscarPorEmail(email) {
    try{
        const usuario = await Usuario.findOne({where: {email: email}});
        if(usuario){
            return usuario || null;
        }
    }
    catch(err){
        console.log('Erro buscando usuário: '+err);
    }
}


async function cadastrarUsuario(req, res) {
    const usuarioData = {
        email: req.body.email,
        password: req.body.password,
        primeiro_nome: req.body.primeiro_nome,
        ultimo_nome: req.body.ultimo_nome
    };

    try {
        const existe = await buscarPorEmail(usuarioData.email);
        if (existe) {
            res.status(400).json({error:"Usuário não pode ser criado, já existe um com este email."});
        } else {
            await Usuario.create(usuarioData);
            res.status(201).json({sucess:"Usuário criado com sucesso."});
        }
    } catch (error) {
        res.status(500).json({error:`Erro ao criar Usuário.`,details:error.message});
    }
}


async function loginUsuario(req, res) {
    const usuarioData = {
        email: req.body.email,
        password: req.body.password
    };
    try {
        const usuario = await buscarPorEmail(usuarioData.email);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const senhaValida = await bcrypt.compare(usuarioData.password, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        const token = jwt.sign(
            {id:usuario.id,email:usuario.email},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.status(200).json({ message: "Login bem-sucedido." ,token:token});
    } catch (error) {
        res.status(500).json({ error: "Erro no login.", details: error.message });
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario
};