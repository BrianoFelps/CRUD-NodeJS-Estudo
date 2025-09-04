import NotAuthorizedError from "../errors/NotAuthorizedError.js";
import { logClient, regClient } from "../models/clientsModel.js";
import bcrypt from "bcrypt";

export const registerClient = async(req, res) => {
    try{
        const {name, email, password} = req.body;
        /*Criptografia de senha. Senha e numero de caracteres do salt*/
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;

        await regClient(name, email, password);
        res.status(201).send();
    } catch(err){   
        return res.status(500).send({message: err.message})
    }
}

export const loginClient = async(req, res, next) =>{
    try{
        const {email, password} = req.body;

        const user = await logClient(email);

        /*Confirma se o usuário existe. Caso o email passado não exista no BD, não será achado*/
        if(!user) throw new NotAuthorizedError();

        /*Confirma se o hash da senha digitada equivale ao hash da senha do BD, retorna bool*/
        const isValid = bcrypt.compareSync(password, user.password);

        if(!isValid) throw new NotAuthorizedError();

        res.status(200).send();
    } catch(err){
        /*Passa para a tratativa de erro do app.js, essa sintaxe de next é limpa */
        next(err);
    }
}