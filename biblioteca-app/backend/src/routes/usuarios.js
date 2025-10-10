import express from "express";
import { db } from "../config/db.js";
const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM Usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { email, password, nombre, rol } = req.body;
  db.query("INSERT INTO Usuarios (email, password, nombre, rol) VALUES (?, ?, ?, ?)", 
  [email, password, nombre, rol], 
  (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Usuario creado correctamente", id: result.insertId });
  });
});

export default router;
