import { Router } from "express";
import { obtenerLibros, obtenerLibroPorId, crearLibro, actualizarLibro,   eliminarLibro
} from "../controllers/libros.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibroPorId);

router.post("/", requireAuth, crearLibro);
router.put("/:id", requireAuth, actualizarLibro);    
router.delete("/:id", requireAuth, eliminarLibro);

export default router;
