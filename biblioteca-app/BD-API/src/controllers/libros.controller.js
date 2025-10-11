import { libros } from "../data/libros.js";
import { autores } from "../data/autores.js";
import { categorias } from "../data/categorias.js";

export const obtenerLibros = (req, res) => {
  const librosCompletos = libros.map(libro => ({
    ...libro,
    autor: autores.find(a => a.id === libro.autorId)?.nombre,
    categoria: categorias.find(c => c.id === libro.categoriaId)?.nombre
  }));
  res.json(librosCompletos);
};

export const obtenerLibroPorId = (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) return res.status(404).json({ mensaje: "Libro no encontrado" });
  res.json(libro);
};

export const crearLibro = (req, res) => {
  const nuevoLibro = {
    id: libros.length + 1,
    ...req.body,
  };
  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
};

export const eliminarLibro = (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ mensaje: "Libro no encontrado" });
  libros.splice(index, 1);
  res.json({ mensaje: "Libro eliminado" });
};
