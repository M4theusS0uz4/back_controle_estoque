const Especificacao = require('../models/Especificacoes_prod');

async function getEspecificacao(req, res) {
    const {cor,tamanho,tipo,genero} = req.body;

    try{
        const especificacao = await Especificacao.findOne({where:{cor:cor,tamanho:tamanho,tipo:tipo,genero:genero}});
        if(!especificacao){
            res.status(404).send('Nenhuma especificação com esse atributos existe.');
        }else{
            res.status(200).json(especificacao);
        }
    }catch (erro){
        console.log(erro)
        res.status(500).json("erro"+erro);
    }
}

module.exports = {getEspecificacao,};