const Promocao = require('../models/promocao');
const {getProdutoId} = require('../controllers/produtoController');
const Produto = require('../models/produto');
const Estoque = require ('../models/estoque');

async function createPromocao(req, res) {
    const { id_prod, valor, data_fim } = req.body;

    if (!valor) {
        return res.status(400).json({ error: "O campo 'valor' é obrigatório." });
    }
    const valorCerto = Number(valor)
    const verificar = await getProdutoId(id_prod);
    if (!verificar) {
        return res.status(404).json({ error: "Produto não encontrado." });
    }
    if (valorCerto >= verificar.preco_unit) {
        return res.status(400).json({
            error: "Não é possível criar uma promoção com valor igual ou maior que o preço do produto."
        });
    }

    const dataAtual = new Date();
    const dataFimValida = new Date(data_fim);

// Normalizar as datas para ignorar horário
    const dataFimSemHora = new Date(dataFimValida.getFullYear(), dataFimValida.getMonth(), dataFimValida.getDate());
    const dataAtualSemHora = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    if (dataFimSemHora <= dataAtualSemHora) {
        return res.status(400).json({ error: "A data de término deve ser futura." });
    }

    try {
        await Promocao.create({ id_prod:id_prod, valor:valorCerto, data_fim:data_fim });
        res.status(200).json({ message: "Promoção realizada com sucesso." });
    } catch (error) {
        console.error("Erro ao criar promoção:", error);
        res.status(500).json({ error: "Erro interno ao criar promoção." });
    }
}

async function getAllPromocao(req, res) {
    try {
        // Buscando todas as promoções
        const promocoes = await Promocao.findAll();

        // Array para armazenar as promoções e os itens associados
        let promocaoComProdutos = [];

        // Iterando sobre as promoções
        for (const promocao of promocoes) {
            const id_item = promocao.dataValues.id_prod;  // Supondo que você tenha um campo id_item na tabela de promoção

            // Agora, buscar o item associado à promoção pelo id_item
            const produto = await Produto.findByPk(id_item); // Usando Sequelize para buscar o item pelo ID

            const estoque = await Estoque.findOne({id_item:id_item});
            if (produto) {
                // Caso o item exista, adicionar as informações do item junto com a promoção
                promocaoComProdutos.push({
                    promocao: promocao,   // Dados da promoção
                    produto: produto,
                    estoque: estoque
                });
            }
        }

        // Retornando a resposta com as promoções e seus itens associados
        res.status(200).json({ promocoesComItens: promocaoComProdutos });

    } catch (error) {
        console.log("Erro", error);
        res.status(500).json({ error: "Erro ao gerar promoções: " + error.message });
    }
}
async function delPromocao(req, res) {
    const { id } = req.params; // id_prod é o identificador da promoção

    try {
        // Busca a promoção pelo ID
        const promocao = await Promocao.findByPk(id);
        console.log(id)
        if (!promocao) {
            return res.status(404).json({ error: "Promoção não encontrada." });
        }

        // Remove a promoção
        await promocao.destroy();

        // Responde com sucesso
        res.status(200).json({ message: "Promoção removida com sucesso." });
    } catch (error) {
        // Captura erros e responde com erro
        res.status(500).json({ error: `Erro ao remover promoção: ${error.message}` });
    }
}

module.exports = {createPromocao, getAllPromocao,delPromocao};