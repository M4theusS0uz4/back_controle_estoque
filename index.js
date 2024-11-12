const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Usuario = require('./models/usuario');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

async function buscarPorEmail(email) {
    try{
        const usuario = await Usuario.findOne({where: {email: email}});
        if(usuario){
            return usuario;
        }
        else{
            return null;
        }
    }
    catch(err){
        console.log('Erro buscando usuário: '+err);
    }
}

app.post('/cadastroUsuario', async (req, res) => {
    const usuario = {
        "email": req.body.email,
        "password": req.body.password,
        "primeiro_nome":req.body.primeiro_nome,
        "ultimo_nome":req.body.ultimo_nome
    }
    try {
        const existe = await buscarPorEmail(usuario.email);
        if(existe){
            res.send("Usuário não pode ser criado, já existe um com este email.");
        }
        else{
            const create = Usuario.create(usuario);
            res.send("Usuário criado com sucesso.");
        }
    }catch (error) {
        res.send(JSON.stringify(error));
    }
})