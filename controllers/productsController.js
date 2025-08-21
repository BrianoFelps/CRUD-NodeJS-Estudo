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
    categoria: "Computadores"
    },
    {
    id: 4, 
    nome: "PC Gamer",
    descricao: "...",
    preco: 5099.99,
    categoria: "Computadores"
    }
];

/*Estrutura basicona de um controller*/
export const getProducts = (_, res) => {
    try{
        return res.status(200).json(products);
    } catch (err){
        return res.status(500).json(`Erro ao obter os produtos: ${err}`);
    }
}

export const addProducts = (req, res) =>{
    try{
        const product = req.body;
        product.id = products.length + 1;
        products.push(product);
        return res.status(200).json(products);
    } catch (err){
        return res.status(500).json(`Erro ao adicionar o produto: ${err}`);
    }
}

export const updateProducts = (req, res) => {
    try{
        const {id, newVal} = req.body;
        products.forEach((product) => {

        })
    } catch (err) {

    }
}