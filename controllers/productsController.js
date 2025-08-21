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
const products = [
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

    },
    {
    id: 4, 
    nome: "PC Gamer",
    descricao: "...",
    preco: 5099.99,
    }
];

/*Estrutura basicona de um controller*/
export const getProducts = (_, res) => {
    try{
        return res.status(200).json(products);
    } catch (err){
        return res.status(500).json("Erro ao obter os produtos");
    }
}