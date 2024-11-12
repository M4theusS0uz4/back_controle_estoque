const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

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
            res.status(400).send("Usuário não pode ser criado, já existe um com este email.");
        } else {
            await Usuario.create(usuarioData);
            res.status(201).send("Usuário criado com sucesso.");
        }
    } catch (error) {
        res.status(500).send(JSON.stringify(error));
    }
}


async function loginUsuario(req, res) {
    const usuarioData = {
        email: req.body.email,
        password: req.body.password
    };
    const usuario = await buscarPorEmail(usuarioData.email);
    if(usuario != null){
        const senhaValida = await bcrypt.compare(usuarioData.password, usuario.password);
        if(!senhaValida){
            return res.send("Senha incorreta.")
        }

        res.send("Login bem sucedido.")
    }
    else{
        res.send("Usuário não encontrado.")
    }
}


module.exports = {
    cadastrarUsuario,
    loginUsuario
};