import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$connect()
    .then(()=> console.log("Conectado ao PostgreSQL via Prisma"))
    .catch(err => console.error("Erro ao conectar ao banco >>>>>>>", err))

export default prisma;