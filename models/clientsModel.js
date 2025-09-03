import prisma from "../database/prisma.js";

export const regClient = (client) =>{
    return prisma.clients.create({
        data: client
    })
}

// export const logClient = (email, password) =>{

// }