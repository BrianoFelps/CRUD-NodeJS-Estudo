import { regClient } from "../models/clientsModel.js";
import bcrypt from "bcrypt";

export const registerClient = async(req, res) => {
    try{
        const user = req.body;
        /*Criptografia de senha. Senha e numero de caracteres do salt*/
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        await regClient(user);
        res.status(201).send();
    } catch(err){   
        return res.status(500).send({message: err.message})
    }
}