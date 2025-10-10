import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM Libros", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url } = req.body;
  const sql = "INSERT INTO Libros (titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Libro agregado correctamente", id: result.insertId });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url } = req.body;
  const sql = "UPDATE Libros SET titulo=?, autor=?, categoria=?, descripcion=?, cantidad_disponible=?, imagen_url=? WHERE id=?";
  db.query(sql, [titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Libro actualizado correctamente" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Libros WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Libro eliminado correctamente" });
  });
});

export default router;
