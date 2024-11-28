const Lote = require('../models/Lote');
const Fornecedor = require("../models/Fornecedor");

async function getLote(num_lote) {
    try {
        const lote = await Lote.findOne({where: {num_lote:num_lote}});
        return !!lote;
    }
    catch(e) {
        console.log('Erro ao buscar lote por Número: '+e)
    }
}

async function cadastrarLote(req, res) {
    const loteData = {
        num_lote:req.body.num_lote,
        id_forn:req.body.id_forn,
        data_entrada:req.body.data_entrada,
        quant_recebida:req.body.quant_recebida,
        tipo_recebido:req.body.tipo_recebido,
    };
    if(['tenis', 'bota', 'chinelo', 'chuteira'].includes(loteData.tipo_recebido)) {
        const existe = await getLote(loteData.num_lote);
        if (existe) {
            res.status(400).send('Já existe um lote com esse número.');
        } else {
            await Lote.create(loteData);
            res.status(200).send("Lote criado com sucesso.");
        }
    }else{
        res.status(400).send("Tipo de recebimento não reconhecido.");
    }

}

async function getAllLotes(req,res){
    try{
        const lotes = await Lote.findAll();
        if(lotes){
            res.status(200).json(lotes);
        }else{
            res.status(500).json({message:"Erro ao buscar lotes."})
        }
    }catch (erro){
        res.status(500).json({message:"Erro ao buscar lotes."+erro})
    }
}

module.exports ={
  cadastrarLote,getAllLotes
};