import prisma from "../database/prisma.js";

export const getAllProducts = () =>{
    return prisma.products.findMany();
}

export const addProduct = (name, description, price, imagesUrl) => {
    return prisma.products.create({
        data:{
            name, 
            description, 
            price, 
            imagesUrl
        }
    })
}


/*
No Postman:
{
    "name" : "Monitor Gamer",
    "description" : "...",
    "price": 699.99,
    "imagesUrl": [
        "ainfajsdfhaskjdhfkajsd"
    ]
}
*/

export const updateProduct = (id, name, description, price, imagesUrl) =>{
    return prisma.products.update({
        where: {id},
        data: {
            name,
            description, 
            price, 
            imagesUrl
        }
    })
}

export const deleteProduct = id =>{
    return prisma.products.delete({
        where: {id}
    })
}