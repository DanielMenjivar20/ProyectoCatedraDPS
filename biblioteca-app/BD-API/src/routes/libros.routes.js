import { Router } from "express";
import { obtenerLibros, obtenerLibroPorId, crearLibro, eliminarLibro } from "../controllers/libros.controller.js";

const router = Router();

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);
router.post("/", crearLibro);
router.delete("/:id", eliminarLibro);

export default router;
