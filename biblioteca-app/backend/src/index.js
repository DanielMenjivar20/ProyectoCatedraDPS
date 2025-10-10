import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import librosRouter from "./routes/libros.js";
import usuariosRouter from "./routes/usuarios.js";
import prestamosRouter from "./routes/prestamos.js";
import { db } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/libros", librosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/prestamos", prestamosRouter);

app.get("/", (req, res) => res.send("API de Biblioteca en funcionamiento"));

app.listen(4000, () => console.log("Servidor corriendo en puerto 4000"));
