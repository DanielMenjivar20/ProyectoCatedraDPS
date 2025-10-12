// src/routes/libros.routes.js
import { Router } from "express";
import {
  obtenerLibros,
  obtenerLibroPorId,
  registrarLibro,
  actualizarLibro,
  eliminarLibro
} from "../controllers/libros.controller.js";

const router = Router();

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);
router.post("/", registrarLibro);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
