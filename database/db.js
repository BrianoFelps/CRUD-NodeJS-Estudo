import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

db.connect((err) => {
    if(err) {
        return console.error(`Erro ao se conectar ao banco de dados (${process.env.MYSQL_DATABASE}): ${err}`);
    }
    
    if(process.env.MYSQL_HOST === 'localhost') console.log(`Usando servidor local`);
    return console.log(`Conexão bem-sucedida ao banco de dados MySQL (${process.env.MYSQL_DATABASE})`);
})

export default db;