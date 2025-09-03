import { regClient } from "../models/clientsModel.js"

export const registerClient = async(req, res) => {
    try{
        const user = req.body;
        await regClient(user);
        res.status(201).send()
    } catch(err){   
        return res.status(500).send({message: err.message})
    }
}