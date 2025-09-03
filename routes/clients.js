import express from "express";
import { registerClient } from "../controllers/clientsController.js";

// import { clientsAuth } from "../middlewares/clientsAuth.js";

const router = express.Router();

/* Cadastro*/ 
router.post("/reg", registerClient);

/* Log-in */
// router.post("/log", (req, res) => res.send("log") );

/*...*/
// router.get("/", );
// router.put("/:id", );
// router.delete("/:id", );

export default router;
