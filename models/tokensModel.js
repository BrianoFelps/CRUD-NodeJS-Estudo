import prisma from "../database/prisma.js";
import bcrypt from "bcrypt";

export const getMatchingRefreshToken = async (refreshToken, clientId) => {
    const tokens = await prisma.tokens.findMany({
        where: {clientId}
    });

    for (const record of tokens){
        const match = await bcrypt.compare(refreshToken, record.token);
        if (match) return record;
    }
    return null;
}

export const saveRefreshToken = (token, clientId) => {
    return prisma.tokens.create({
        data: {
            token, 
            clientId
        }
    })
}

export const deleteRefreshTokenById = async(id) => {
    return prisma.tokens.delete({
        where: {id}
    })
}
