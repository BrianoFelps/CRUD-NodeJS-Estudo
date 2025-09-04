import express from "express";
import { getProducts, addProducts, updateProducts, deleteProducts } from '../controllers/productsController.js'
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", auth, addProducts);
router.put("/:id", auth, updateProducts);
router.delete("/:id", auth, deleteProducts);

export default router;
