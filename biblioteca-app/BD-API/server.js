import express from "express";
import cors from "cors";

import usuariosRoutes from "./src/routes/usuarios.routes.js"; // ← la ruta correcta


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
