const API = "http://192.168.0.0:4000"; 
// Si pruebas con teléfono en la misma red, usa: http://192.168.x.x:4000/api
export async function login(email, password) {
  const r = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) throw new Error("Login inválido");
  return r.json(); 
}

export async function register(data) {
  const r = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Registro inválido");
  return r.json();
}

export async function getLibros() {
  const r = await fetch(`${API}/api/libros`);
  if (!r.ok) throw new Error("Error al listar libros");
  return r.json();
}

export async function crearLibro(data, token) {
  const r = await fetch(`${API}/api/libros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Error al crear libro");
  return r.json();
}
