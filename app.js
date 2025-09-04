import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import usersRouter from './routes/clients.js';
import NotAuthorizedError from './errors/NotAuthorizedError.js';

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

/*
Chamando o Handler: Função, método, rotina especializado
em executar uma função principal do programa, e/ou tratar dados.
Os handlers finalizam o processamento de requisição e retornam uma resposta.
*/
app.use(productsRouter);
app.use(usersRouter);

//Middleware especializado em tratativa de erros
app.use((err, req, res, next) =>{
    console.log(err.message);
    if(err instanceof NotFoundError) return res.status(404).json({message: err.message});
    if (err instanceof NotAuthorizedError) return res.status(401).json({message: err.message});
    res.status(500).json({message: "Internal server error!"});
})


export default app;

//App separado da inicialização do servidor para otimizar testes posteriormente

/*Primeiro arquivo criado, prepara o ambiente express/cors*/ 