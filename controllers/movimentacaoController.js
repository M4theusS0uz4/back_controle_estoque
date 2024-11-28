const Movimentacao = require('../models/Movimentacao_est');

async function compraMovimentacao(req, res) {
    const {id_estoque,quantidade} = req.body;

    try{
        const movimentacao =  await Movimentacao.create({id_estoque:id_estoque,tipo_movimento:"Saida",quantidade:quantidade});
        if(movimentacao){
            res.status(200).send(movimentacao);
        }else{
            res.status(400).send("Erro ao criar movimentação.")
        }
    }catch(err){
        res.status(400).send({error: 'Erro ao realizar movimentação da compra.'});
    }
}

async function realizarEntrada(req,res){
    const {id_estoque,quantidade} = req.body;

    try{
        const movimentacao =  await Movimentacao.create({id_estoque:id_estoque,tipo_movimento:"Entrda",quantidade:quantidade});
        if(movimentacao){
            res.status(200).send(movimentacao);
        }else{
            res.status(400).send("Erro ao criar movimentação.")
        }
    }catch(err){
        res.status(400).send({error: 'Erro ao realizar movimentação da compra.'});
    }
}

module.exports = {compraMovimentacao,realizarEntrada}