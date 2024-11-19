const Produto = require('../models/Produto');
const error = require("multer/lib/multer-error");

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
            imagem_url: imagemUrl,  // Salvando o caminho da imagem
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
        return res.status(200).json(produto);
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

async function deleteProduto(req,res){

}


module.exports = {getProdutos,criarProduto,getProduto,updateProduto};