const Produto = require('../models/Produto');
const error = require("multer/lib/multer-error");
const Estoque = require('../models/Estoque');
const Especificacao = require('../models/Especificacoes_prod');


async function criarProduto(req, res) {
    const { nome_prod, marca_prod, preco_unit, num_lote } = req.body;

    // Verifica se a imagem foi anexada
    if (!req.file) {
        return res.status(400).json({ error: 'Imagem do produto é obrigatória.' });
    }

    // Caminho da imagem salva no servidor
    const imagemUrl = `/uploads/${req.file.originalname}`;  // Caminho da imagem com o nome original

    try {
        // Criar o produto no banco de dados, incluindo a URL da imagem e a chave estrangeira para lote
        const novoProduto = await Produto.create({
            nome_prod,
            marca_prod,
            preco_unit,
            num_lote,  // Chave estrangeira do lote
            url_img: imagemUrl,  // Salvando o caminho da imagem
        });

        // Retorna o produto criado
        return res.status(201).send("Produto com imagem cadastrado com sucesso.");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao cadastrar o produto: ' + error.message);
    }
}



async function getProdutos(req, res) {
    const produtos = await Produto.findAll();
    return res.json(produtos);
}


async function getProduto(req,res){
    const id_prod = req.body.id_prod;
    try{
        const produto = await Produto.findOne({where:{id_prod:id_prod}});
        if(produto) {
            return res.status(200).json(produto);
        }else{
            return null;
        }
    }catch (erro){
        console.log(erro);
        return res.status(500).send('Erro ao procurar produto.');
    }

}

async function updateProduto(req,res){
    const { id_prod,nome_prod, marca_prod, preco_unit, num_lote } = req.body;
    try{
        const [updated] = await Produto.update(
            { nome_prod, marca_prod, preco_unit, num_lote },
            { where: { id_prod: id_prod } }
        );

        if(updated){
            const updateProduto = await getProdutoId(id_prod);
            return res.status(200).json(updateProduto);
        }else{
            return res.status(404).send('Produto não encontrado.');
        }
    }catch (erro){
        console.log(erro);
        return res.status(500).send('Erro ao atualizar produto: ' + error.message);
    }
}

async function getProdutoId(id_prod){
    try{
        const produto = await Produto.findOne({where:{id_prod:id_prod}});
        return produto||null;
    }catch (erro){
        console.log(erro);
    }
}

async function getProdutoForType(req, res) {
    const { type } = req.body;  // Recebe o tipo de especificação desejado

    try {
        // 1. Buscar as especificações que têm o tipo igual ao parâmetro 'type'
        const especificacoes = await Especificacao.findAll({
            where: {
                tipo: type  // Filtra pelo tipo da especificação
            },
            attributes: ['id_espec_prod']  // Apenas os IDs das especificações
        });

        // Se não encontrar nenhuma especificação com o tipo informado
        if (especificacoes.length === 0) {
            return res.status(404).json({ error: "Nenhuma especificação encontrada com esse tipo." });
        }

        // 2. Extrair os IDs das especificações encontradas
        const idsEspecificacao = especificacoes.map(espec => espec.id_espec_prod);

        // 3. Buscar os produtos no estoque que possuem esses IDs de especificação
        const estoqueComEspecificacoes = await Estoque.findAll({
            where: {
                id_espec_prod: idsEspecificacao  // Filtra o estoque pelos IDs das especificações
            },
            attributes: ['id_prod', 'id_espec_prod', 'quant_atual', 'quant_max', 'quant_min'],  // Campos desejados do estoque
        });

        // Se não encontrar nenhum produto no estoque
        if (estoqueComEspecificacoes.length === 0) {
            return res.status(404).json({ error: "Nenhum produto encontrado para as especificações desse tipo." });
        }

        // 4. Extrair os IDs dos produtos encontrados no estoque
        const idsProdutos = estoqueComEspecificacoes.map(item => item.id_prod);

        // 5. Buscar os detalhes dos produtos usando os IDs
        const produtos = await Produto.findAll({
            where: {
                id_prod: idsProdutos  // Filtra os produtos pelos IDs encontrados no estoque
            }
        });

        // Se não encontrar nenhum produto
        if (produtos.length === 0) {
            return res.status(404).json({ error: "Nenhum produto encontrado." });
        }

        // Retorna os produtos encontrados
        return res.status(200).json(produtos);
    } catch (erro) {
        console.error(erro);
        res.status(500).send('Erro ao procurar produtos por tipo: ' + erro.message);  // Caso ocorra algum erro
    }
}

async function deleteProduto(req,res){

}


module.exports = {getProdutos,criarProduto,getProduto,updateProduto,getProdutoId,getProdutoForType};