import express from "express";
import cors from "cors";

import librosRoutes from "./routes/libros.routes.js";
import autoresRoutes from "./routes/autores.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/libros", librosRoutes);
app.use("/api/autores", autoresRoutes);
app.use("/api/categorias", categoriasRoutes);

export default app;