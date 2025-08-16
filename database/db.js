import Pool from 'pg'
import dotenv from 'dotenv';

dotenv.config();

export const db = db.createConnection({
    host: process.env.db_HOST,
    port: process.env.db_PORT,
    user: process.env.db_USER,
    password: process.env.db_ROOT_PASSWORD,
    database: process.env.db_DATABASE
})

db.connect((err) => {
    if(err) {
        return console.error(`Erro ao se conectar ao banco de dados (${process.env.db_DATABASE}): ${err}`);
    }
    
    if(process.env.db_HOST === 'localhost') console.log(`Usando servidor local`);
    return console.log(`Conexão bem-sucedida ao banco de dados db (${process.env.db_DATABASE})`);
})

export default db;