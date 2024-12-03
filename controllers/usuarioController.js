const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const Produto = require("../models/Produto");
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
        let role;
        const usuario = await buscarPorEmail(usuarioData.email);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const senhaValida = await bcrypt.compare(usuarioData.password, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        if(usuario.is_admin){
            role = 'funcionario';
        }else if(usuario.is_admin && usuario.is_admin_geral){
            role = 'adming';
        }else{
            role = 'guest';
        }

        const token = jwt.sign(
            {id:usuario.id_user,email:usuario.email},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.status(200).json({ message: "Login bem-sucedido." ,token:token, role:role});
    } catch (error) {
        res.status(500).json({ error: "Erro no login.", details: error.message });
    }
}

const configEmail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Define como `false` para usar STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


async function recuperarSenha(req, res) {
    const { email } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await buscarPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        // Gera uma senha temporária
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Atualiza a senha no banco de dados
        await Usuario.update(
            { password: hashedPassword }, // Atualiza o campo correto no modelo
            { where: { email: usuario.email } }
        );

        // Configura o email a ser enviado
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Recuperação de Senha",
            text: `Olá, sua nova senha temporária é: ${tempPassword}\nPor favor, altere sua senha assim que acessar sua conta.`,
        };

        // Envia o email
        await configEmail.sendMail(mailOptions);

        // Responde ao cliente
        res.status(200).json({ message: "Senha temporária enviada para o email." });
    } catch (error) {
        console.error("Erro na recuperação de senha:", error);
        res.status(500).json({ error: "Erro ao redefinir senha.", details: error.message });
    }
}
async function cadastrarUsuarioFuncionario(req, res) {
    const usuarioData = {
        email: req.body.email,
        password: req.body.password,
        primeiro_nome: req.body.primeiro_nome,
        ultimo_nome: req.body.ultimo_nome,
        is_admin:true,
    };

    try {
        const existe = await buscarPorEmail(usuarioData.email);
        if (existe) {
            res.status(400).json({error:"Funcionário não pode ser criado. Já existe um funcionário semelhante."});
        } else {
            await Usuario.create(usuarioData);
            res.status(201).json({sucess:"Usuário cadastrado com sucesso."});
        }
    } catch (error) {
        res.status(500).json({error:`Erro ao criar Usuário.`,details:error.message});
    }
}

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    recuperarSenha,
    cadastrarUsuarioFuncionario
};