const Estoque = require('../models/Estoque');

async function cadastrarEstoque(req, res) {
    const {id_espec_prod, id_prod, quant_atual, quant_max,quant_min} = req.body;

    try{
        await Estoque.create({id_espec_prod, id_prod, quant_atual, quant_max,quant_min})
        res.status(201).json('Estoque cadastrado');
    }catch (error){
        console.log(error)
        res.status(500).json('Erro'+error);
    }
}

module.exports = {cadastrarEstoque,};