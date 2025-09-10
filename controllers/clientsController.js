import NotAuthorizedError from "../errors/NotAuthorizedError.js";
import { logClient, regClient } from "../models/clientsModel.js";
import bcrypt from "bcrypt";
import { generateAcessToken, generateRefreshToken } from "../Utils/jwt.js";
import { saveRefreshToken } from "../models/tokensModel.js";

export const registerClient = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        /*Criptografia de senha. Senha e numero de caracteres do salt*/
        const hashedPassword = await bcrypt.hash(password, 10);

        await regClient(name, email, hashedPassword);
        res.status(201).send();
    } catch(err){   
        next(err);
    }
}


export const loginClient = async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        const user = await logClient(email);

        /*Confirma se o usuário existe. Caso o email passado não exista no BD, não será achado*/
        if(!user) throw new NotAuthorizedError();
        /*Confirma se o hash da senha digitada equivale ao hash da senha do BD, retorna bool*/
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) throw new NotAuthorizedError();

        const payload = {
            "iss": "http://localhost:8080",
            "sub": user.id
        }

        /*Função criada para simplificar*/
        const acessToken = generateAcessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

        /* 
        Salve o refresh token no banco, associado ao usuário, aqui em hash, para mais segurança.
        O refresh é enviado pro front sem hash, depois é só usar bcrypt.compare() na função do
        models.
        */
        await saveRefreshToken(hashedRefreshToken, user.id);

        // Envie o refresh token em um cookie HTTP-only
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Só o backend pode acessar (não disponível via JS no navegador)
            secure: false, // use true em produção (HTTPS)
            sameSite: 'strict', // Só aceita requisições do mesmo site
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
        });

        res.json({ acessToken });
    } catch(err){
        /*Passa para a tratativa de erro do app.js, essa sintaxe de next é limpa */
        next(err);
    }
}