import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convierte import.meta.url a ruta de archivo válida
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta al JSON
const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// Leer usuarios
const leerUsuarios = () => {
  if (!fs.existsSync(usuariosPath)) fs.writeFileSync(usuariosPath, "[]"); // crea vacío si no existe
  const data = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(data);
};

// Guardar usuarios
const guardarUsuarios = (usuarios) => {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
};

// GET /api/usuarios
export const obtenerUsuarios = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

// POST /api/usuarios (registrar)
export const registrarUsuario = (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ message: "Todos los campos son obligatorios" });

  const usuarios = leerUsuarios();
  if (usuarios.find(u => u.email === email))
    return res.status(400).json({ message: "El correo ya está registrado" });

  const id = usuarios.length + 1;
  const nuevoUsuario = { id, nombre, email, password };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json(nuevoUsuario);
};

// POST /api/usuarios/login
export const loginUsuario = (req, res) => {
  const { email, password } = req.body;
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (!usuario) return res.status(401).json({ message: "Email o contraseña incorrectos" });

  res.json({ message: "Login exitoso", usuario });
};
