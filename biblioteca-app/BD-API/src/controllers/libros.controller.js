import { db } from "../data/mysql.js";

export const obtenerLibros = (req, res) => {
  const sql = "SELECT id, titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url FROM Libros";
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

export const obtenerLibroPorId = (req, res) => {
  const sql = "SELECT id, titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url FROM Libros WHERE id = ?";
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (!rows.length) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json(rows[0]);
  });
};

export const crearLibro = (req, res) => {
  const { titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url } = req.body || {};
  if (!titulo || !autor || !categoria) {
    return res.status(400).json({ mensaje: "titulo, autor y categoria son obligatorios" });
  }
  const sql = `
    INSERT INTO Libros (titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [titulo, autor, categoria, descripcion ?? "", Number(cantidad_disponible ?? 0), imagen_url ?? ""], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({
      id: result.insertId,
      titulo, autor, categoria,
      descripcion: descripcion ?? "",
      cantidad_disponible: Number(cantidad_disponible ?? 0),
      imagen_url: imagen_url ?? ""
    });
  });
};

export const actualizarLibro = (req, res) => {
  const { titulo, autor, categoria, descripcion, cantidad_disponible, imagen_url } = req.body || {};
  const sql = `
    UPDATE Libros
    SET titulo=?, autor=?, categoria=?, descripcion=?, cantidad_disponible=?, imagen_url=?
    WHERE id=?
  `;
  db.query(sql, [titulo, autor, categoria, descripcion ?? "", Number(cantidad_disponible ?? 0), imagen_url ?? "", req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Libro actualizado" });
  });
};

export const eliminarLibro = (req, res) => {
  db.query("DELETE FROM Libros WHERE id = ?", [req.params.id], (err, r) => {
    if (err) return res.status(500).json({ error: err });
    if (r.affectedRows === 0) return res.status(404).json({ mensaje: "Libro no encontrado" });
    res.json({ mensaje: "Libro eliminado" });
  });
};
