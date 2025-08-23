import express from 'express';
import cors from 'cors';
import router from './routes/products.js';

const app = express();

/*
Conversão do arquivo json para as funções 
receberem uma requisição compatível. 
É um middleware: Estes tratam requisições, podendo mudar sua estrutura, conteúdo, etc.
Antes de chegar a um handler.
*/
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log("Horário: " + new Date().toISOString());
    next();
})

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if(auth === 'verificacao token') return next();
    res.status(401).send();
})

/*
Chamando o Handler: Função, método, rotina especializado
em executar uma função principal do programa, e/ou tratar dados.
Os handlers finalizam o processamento de requisição e retornam uma resposta.
*/
app.use("/", router);

export default app;

//App separado da inicialização do servidor para otimizar testes posteriormente

/*Primeiro arquivo criado, prepara o ambiente express/cors*/ 