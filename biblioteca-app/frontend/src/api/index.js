// src/api/index.js
import axios from "axios";

const DEFAULT_BASE = "http://10.0.2.2:4000/api"; // emulador Android
// Si pruebas con teléfono en la misma red, usa: http://192.168.x.x:4000/api

const api = axios.create({ baseURL: DEFAULT_BASE });

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;