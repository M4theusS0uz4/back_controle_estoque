const Fornecedor = require('../models/Fornecedor');
const axios = require('axios');

function limparCnpj(cnpj){
    return cnpj.replace(/[.\-/]/g, "");
}
async function buscarCnpj(cnpj){
    try{
        const fornecedor = await Fornecedor.findOne({where:{cnpj: cnpj}});
        if(fornecedor){
            return fornecedor||null;
        }
    }catch(error){
        console.log("Erro ao procurar cnpj:"+error);
    }
}

async function cadastroFornecedor(req, res) {
    const cnpj = req.body.cnpj;
    const cnpjLimpo = limparCnpj(cnpj);
    const existe = buscarCnpj(cnpj);
    if(existe){
        res.send("Cnpj já existente no banco de dados.");
    }else{
    try{
        const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpjLimpo}`);
        endereco = response.data.logradouro + response.data.numero + response.data.complemento + response.data.cep;
        const fornecedor = {
            "nome_forn":response.data.nome,
            "cnpj":cnpj,
            "telefone":response.data.telefone,
            "email":response.data.email,
            "endereco": endereco
        }
        await Fornecedor.create(fornecedor);
        res.send("Fornecedor cadastrado com sucesso."+fornecedor);
    }catch(error){
        console.log(error);
        res.send(500).send("Erro ao busca CPF:"+error);
    }
    }
}

module.exports = {cadastroFornecedor};