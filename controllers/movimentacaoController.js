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
        const movimentacao =  await Movimentacao.create({id_estoque:id_estoque,tipo_movimento:"Entrada",quantidade:quantidade});
        if(movimentacao){
            res.status(200).send(movimentacao);
        }else{
            res.status(400).send("Erro ao criar movimentação.")
        }
    }catch(err){
        res.status(400).send({error: 'Erro ao realizar movimentação da compra.'});
    }
}

async function getAllMovimentacoes(req,res){
    try{
        const movimentacacoes = await Movimentacao.findAll();
        if(movimentacacoes && movimentacacoes.length > 0){
            res.status(200).send(movimentacacoes);
        }else{
            res.status(400).json("Movimentações não encontradas.")
        }
    }catch (erro){
        res.status(400).json("erro: "+erro)
    }
}

module.exports = {compraMovimentacao,realizarEntrada,getAllMovimentacoes}