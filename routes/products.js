import express from "express";
import { getProducts, addProducts, updateProducts } from '../controllers/productsController.js'

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProducts);
router.put("/:id", updateProducts);

export default router;
