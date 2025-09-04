import jwt from "jsonwebtoken";
import NotAuthorizedError from "../errors/NotAuthorizedError.js";

const auth = (req, res, next) => {
    try {
        /*Pega o token dos headers, tira a primeira palavra e pega só o token,
        verifica se o token é valido, passa pra próxima função*/
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        next(new NotAuthorizedError());
    }
}

export default auth;