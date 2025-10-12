// src/controllers/libros.controller.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const librosPath = path.join(__dirname, "../data/libros.json");

const asegurarArchivo = () => {
  if (!fs.existsSync(librosPath)) fs.writeFileSync(librosPath, "[]");
};

const leerLibros = () => {
  asegurarArchivo();
  const data = fs.readFileSync(librosPath, "utf-8");
  return JSON.parse(data);
};

const guardarLibros = (libros) => {
  fs.writeFileSync(librosPath, JSON.stringify(libros, null, 2));
};

// GET /api/libros
export const obtenerLibros = (req, res) => {
  const libros = leerLibros();
  res.json(libros);
};

// GET /api/libros/:id
export const obtenerLibroPorId = (req, res) => {
  const { id } = req.params;
  const libros = leerLibros();
  const libro = libros.find(l => l.id === Number(id));
  if (!libro) return res.status(404).json({ message: "Libro no encontrado" });
  res.json(libro);
};

// POST /api/libros
export const registrarLibro = (req, res) => {
  const { titulo, autor, categoria, imagenUrl } = req.body;
  if (!titulo || !autor || !categoria) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  const libros = leerLibros();
  const id = libros.length ? Math.max(...libros.map(l=>l.id)) + 1 : 1;
  const nuevoLibro = { id, titulo, autor, categoria, imagenUrl: imagenUrl || "", disponible: true };
  libros.push(nuevoLibro);
  guardarLibros(libros);
  res.status(201).json(nuevoLibro);
};

// PUT /api/libros/:id
export const actualizarLibro = (req, res) => {
  const { id } = req.params;
  const { titulo, autor, categoria, imagenUrl } = req.body;
  const libros = leerLibros();
  const idx = libros.findIndex(l => l.id === Number(id));
  if (idx === -1) return res.status(404).json({ message: "Libro no encontrado" });

  // validar opcional: asegúrate de enviar al menos los campos requeridos
  if (!titulo || !autor || !categoria) {
    return res.status(400).json({ message: "Titulo, autor y categoria son obligatorios" });
  }

  libros[idx] = { ...libros[idx], titulo, autor, categoria, imagenUrl: imagenUrl || libros[idx].imagenUrl };
  guardarLibros(libros);
  res.json(libros[idx]);
};

// DELETE /api/libros/:id
export const eliminarLibro = (req, res) => {
  const { id } = req.params;
  const libros = leerLibros();
  const idx = libros.findIndex(l => l.id === Number(id));
  if (idx === -1) return res.status(404).json({ message: "Libro no encontrado" });
  const eliminado = libros.splice(idx, 1)[0];
  guardarLibros(libros);
  res.json({ message: "Eliminado", eliminado });
};
