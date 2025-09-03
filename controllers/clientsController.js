import { regClient } from "../models/clientsModel.js";
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