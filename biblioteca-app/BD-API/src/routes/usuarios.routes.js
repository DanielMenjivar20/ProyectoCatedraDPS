// src/routes/usuarios.routes.js
import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  registrarUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario
} from "../controllers/usuarios.controller.js";

const router = Router();

// Rutas de usuarios
router.get("/", obtenerUsuarios);           // Lista todos los usuarios
router.get("/:id", obtenerUsuarioPorId);   // Obtener usuario por id
router.post("/", registrarUsuario);        // Crear usuario
router.put("/:id", actualizarUsuario);     // Actualizar usuario
router.delete("/:id", eliminarUsuario);    // Eliminar usuario
router.post("/login", loginUsuario);       // Login

export default router;

