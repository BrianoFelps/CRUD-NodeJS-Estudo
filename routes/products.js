import express from "express";
import { getProducts, addProducts, updateProducts, deleteProducts } from '../controllers/productsController.js'
import { productsAuth } from "../middlewares/products.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", productsAuth, addProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
