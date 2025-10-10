import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM Prestamo", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion } = req.body;

  db.query("SELECT cantidad_disponible FROM Libros WHERE id = ?", [libro_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ message: "Libro no encontrado" });

    if (rows[0].cantidad_disponible < 1) return res.status(400).json({ message: "Libro no disponible" });

    db.query(
      "INSERT INTO Prestamo (usuario_id, libro_id, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)",
      [usuario_id, libro_id, fecha_prestamo, fecha_devolucion],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        db.query("UPDATE Libros SET cantidad_disponible = cantidad_disponible - 1 WHERE id = ?", [libro_id]);
        res.json({ message: "Préstamo registrado correctamente", id: result.insertId });
      }
    );
  });
});

export default router;
