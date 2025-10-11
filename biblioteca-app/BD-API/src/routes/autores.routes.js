import { Router } from "express";
import { obtenerAutores } from "../controllers/autores.controller.js";

const router = Router();
router.get("/", obtenerAutores);
export default router;
