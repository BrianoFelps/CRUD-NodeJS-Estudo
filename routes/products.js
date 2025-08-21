import express from "express";
// import { getProducts } from '../controllers/productsController'

const router = express.Router();

router.get("/", (_, res) => {
    console.log("Deu certo!");
    return res.status(200).json();
})

export default router;
