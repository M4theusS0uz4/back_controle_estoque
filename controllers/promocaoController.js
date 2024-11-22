const Promocao = require('../models/promocao');
const {getProdutoId} = require('../controllers/produtoController');


async function createPromocao(req, res) {
    const { id_prod, valor, data_fim } = req.body;

    if (!valor) {
        return res.status(400).json({ error: "O campo 'valor' é obrigatório." });
    }

    const verificar = await getProdutoId(id_prod); // Certifique-se de usar `await` para chamadas assíncronas
    if (!verificar) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }

    try {
        await Promocao.create({ id_prod, valor, data_fim });
        res.status(200).json({ message: "Promoção realizada com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar promoção: " + error });
    }
}

module.exports = {createPromocao,};