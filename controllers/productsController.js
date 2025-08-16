import PrismaClient from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts = async (_, res) => {
    try{
        const products = await prisma.products.findMany();
        return res.status(200).json(products);
    } catch (err) {
        console.error("Erro ao buscar produtos", err);
        return res.status(500).json({ error: "Erro interno do servidor "});
    }
}