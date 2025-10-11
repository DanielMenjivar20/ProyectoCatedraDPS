import { categorias } from "../data/categorias.js";

export const obtenerCategorias = (req, res) => {
  res.json(categorias);
};
