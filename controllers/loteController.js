const Lote = require('../models/Lote');

async function getLote(num_lote) {
    try {
        const lote = await Lote.findOne({whrere: {num_lote:num_lote}});
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

module.exports ={
  cadastrarLote,
};