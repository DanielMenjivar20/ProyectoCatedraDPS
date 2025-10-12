import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// 🔹 Asegura que exista el archivo
const asegurarArchivo = () => {
  if (!fs.existsSync(usuariosPath)) fs.writeFileSync(usuariosPath, "[]");
};

// 🔹 Leer usuarios
const leerUsuarios = () => {
  asegurarArchivo();
  const data = fs.readFileSync(usuariosPath, "utf-8");
  return JSON.parse(data);
};

// 🔹 Guardar usuarios
const guardarUsuarios = (usuarios) => {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
};

// GET /api/usuarios
export const obtenerUsuarios = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

// GET /api/usuarios/:id
export const obtenerUsuarioPorId = (req, res) => {
  const { id } = req.params;
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === Number(id));
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(usuario);
};

// POST /api/usuarios
export const registrarUsuario = (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password)
    return res.status(400).json({ message: "Todos los campos son obligatorios" });

  const usuarios = leerUsuarios();
  if (usuarios.find(u => u.email === email))
    return res.status(400).json({ message: "El correo ya está registrado" });

  const id = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevoUsuario = { id, nombre, email, password };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json(nuevoUsuario);
};

// PUT /api/usuarios/:id
export const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  const usuarios = leerUsuarios();
  const idx = usuarios.findIndex(u => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  if (!nombre || !email) {
    return res.status(400).json({ message: "Nombre y correo son obligatorios" });
  }

  usuarios[idx] = { ...usuarios[idx], nombre, email };
  guardarUsuarios(usuarios);
  res.json(usuarios[idx]);
};

// DELETE /api/usuarios/:id
export const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const usuarios = leerUsuarios();
  const idx = usuarios.findIndex(u => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  const eliminado = usuarios.splice(idx, 1)[0];
  guardarUsuarios(usuarios);
  res.json({ message: "Usuario eliminado", eliminado });
};

// POST /api/usuarios/login (opcional)
export const loginUsuario = (req, res) => {
  const { email, password } = req.body;
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (!usuario) return res.status(401).json({ message: "Email o contraseña incorrectos" });

  res.json({ message: "Login exitoso", usuario });
};
