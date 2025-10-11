import { autores } from "../data/autores.js";

export const obtenerAutores = (req, res) => {
  res.json(autores);
};
