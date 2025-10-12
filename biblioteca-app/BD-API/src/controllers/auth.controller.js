import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../data/mysql.js";

const JWT_SECRET = process.env.JWT_SECRET || "aqui el token";

export const register = (req, res) => {
  const { email, password, nombre, rol } = req.body || {};
  if (!email || !password || !nombre || !rol) return res.status(400).json({ message: "Campos incompletos" });

  db.query("SELECT id FROM Usuarios WHERE email=?", [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length) return res.status(409).json({ message: "Email ya registrado" });

    const hash = await bcrypt.hash(password, 10);
    db.query("INSERT INTO Usuarios (email, password, nombre, rol) VALUES (?,?,?,?)",
      [email, hash, nombre, rol],
      (e2, result) => e2 ? res.status(500).json({ error: e2 }) : res.json({ message:"Usuario registrado", id: result.insertId })
    );
  });
};

export const login = (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Campos incompletos" });

  db.query("SELECT * FROM Usuarios WHERE email=?", [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (!rows.length) return res.status(401).json({ message: "Credenciales inválidas" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, rol: user.rol, email: user.email }, JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol, email: user.email } });
  });
};
