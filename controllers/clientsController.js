import NotAuthorizedError from "../errors/NotAuthorizedError.js";
import { logClient, regClient } from "../models/clientsModel.js";
import bcrypt from "bcrypt";
import { generateAcessToken } from "../Utils/jwt.js";

export const registerClient = async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        /*Criptografia de senha. Senha e numero de caracteres do salt*/
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;

        await regClient(name, email, password);
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
        // const refreshToken = generateAcessToken(payload);

        // res.json({ acessToken, refreshToken })
        res.json({ acessToken })
    } catch(err){
        /*Passa para a tratativa de erro do app.js, essa sintaxe de next é limpa */
        next(err);
    }
}