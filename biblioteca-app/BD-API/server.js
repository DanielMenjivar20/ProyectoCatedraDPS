import express from "express";
import cors from "cors";

import usuariosRoutes from "./src/routes/usuarios.routes.js";
import librosRoutes from "./src/routes/libros.routes.js"; // importa rutas de libros

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/libros", librosRoutes); // registra la ruta de libros

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
