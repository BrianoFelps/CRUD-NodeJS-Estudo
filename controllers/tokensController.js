import {getMatchingRefreshToken, deleteRefreshTokenById} from '../models/tokensModel.js';
import { generateAcessToken } from '../Utils/jwt.js';
import jwt from 'jsonwebtoken';
import InvalidRefreshToken from '../errors/InvalidRefreshToken.js';

export const refreshToken = async (req, res, next) =>{
    try {
        // O refresh token vem do cookie
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({error: "Refresh token não encontrado!"});

        const payload = jwt.decode(refreshToken);
        const clientId = payload?.sub;
        if(!clientId) throw new InvalidRefreshToken();

        // Verificação do token no BD
        const tokenRecord = await getMatchingRefreshToken(refreshToken, clientId);
        if(!tokenRecord) throw new InvalidRefreshToken();

        // Valida o refresh token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, 
            (err, payload) =>{
                if(err) throw new InvalidRefreshToken();

                //Gera novo token
                const acessToken = generateAcessToken({ 
                    iss: "http://localhost:8080",
                    sub: payload.sub
                });
                res.json({acessToken});
            });
    } catch (err) {
        next(err);
    }
}
/*
 Etapas do processo: adquirir o refreshToken dos cookies lançado no login, 
ler as informações do payload pelo jwt.decode(refreshToken) e payload?.sub, que pega o clientId. Depois usar
a função dos models para adquirir o hash de refresh token semelhante no BD. Por fim deletar pelo id do token 
encontrado.
*/
export const logout = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(400).json({ error: "Refresh token não encontrado" });

        const payload = jwt.decode(refreshToken);
        const clientId = payload?.sub;
        if(!clientId) throw new InvalidRefreshToken();

        const tokenRecord = await getMatchingRefreshToken(refreshToken, clientId);
        if(!tokenRecord) throw new InvalidRefreshToken();
        await deleteRefreshTokenById(tokenRecord.id);

        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}