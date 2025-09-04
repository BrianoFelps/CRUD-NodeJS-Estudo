import prisma from "../database/prisma.js";

export const regClient = (name, email, password) =>{
    return prisma.clients.create({
        data: {
            name,
            email, 
            password
        }
    })
}

export const logClient = (email) =>{
    return prisma.clients.findFirst({
        where: {email}
    })
}