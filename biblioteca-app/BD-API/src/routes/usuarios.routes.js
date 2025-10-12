import { Router } from "express";
import { obtenerUsuarios, registrarUsuario, loginUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/", obtenerUsuarios);
router.post("/", registrarUsuario);
router.post("/login", loginUsuario);

export default router;
