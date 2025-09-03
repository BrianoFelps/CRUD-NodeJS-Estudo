import ErrorNotFound from "../errors/ErrorNotFound.js";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../models/productsModel.js";

// import PrismaClient from '@prisma/client';

//const prisma = new PrismaClient();

/*Exemplo base de get com prisma, postgreSQL e resposta*/
/*
export const getProducts = async (_, res) => {
    try{
        const products = await prisma.products.findMany();
        return res.status(200).json(products);
    } catch (err) {
        console.error("Erro ao buscar produtos", err);
        return res.status(500).json({ error: "Erro interno do servidor "});
    }
}*/

//tratamento com dados brutos, sem banco de dados

/*const products = [
    {
    id: 1, 
    nome: "Cadeira ergonômica",
    descricao: "...",
    preco: 599.99,
    categoria: "Cadeiras"
    },
    {
    id: 2, 
    nome: "Cadeira ergonômica XD10",
    descricao: "...",
    preco: 999.99,
    categoria: "Cadeiras"
    },
    {
    id: 3, 
    nome: "PC Gamer de entrada",
    descricao: "...",
    preco: 2099.99,
    categoria: "Computadores"
    },
    {
    id: 4, 
    nome: "PC Gamer",
    descricao: "...",
    preco: 5099.99,
    categoria: "Computadores"
    }
];*/

/*
Estrutura basicona de um controller.
como o routes/products.js já tratam dos endpoints,
basta uma função com req/res
*/
export const getProducts = async (_, res) => {
    try{
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (err){
        return res.status(500).json(`Erro ao obter os produtos: ${err}`);
    }
}

/*VALIDAÇÃO DA REQ COM LIBS PODE SER IDEAL PARA PROJETOS MAIORES*/

export const addProducts = async (req, res) =>{
    try{
        const {name, description, price, imagesUrl} = req.body;
        await addProduct(name, description, price, imagesUrl);
        return res.status(200).json({status: "ok"});
    } catch (err){
        return res.status(500).json(`Erro ao adicionar o produto: ${err}`);
    }
}

export const updateProducts = async(req, res, next) => {
    try{
        //com params eu puxo os parametros da requisição, isso é o que se passa depois da rota por padrão
        const id = Number(req.params.id);
        const {name, description, price, imagesUrl} = req.body;
        
        await updateProduct(id, name, description, price, imagesUrl)

        return res.status(200).json({status: "ok"});
    } catch (err) {
        if(err instanceof ErrorNotFound) return res.status(404).json({message: err.message});
        //passa pra tratativa de erros status 500
        next(err);
    }
}

export const deleteProducts = async (req, res) =>{
    try {
        const id = Number(req.params.id);

        await deleteProduct(id);

        return res.status(200).json({status: "ok"});
    } catch (err) {
        return res.status(500).json(`Erro ao deletar o produto: ${err}`);
    }
}