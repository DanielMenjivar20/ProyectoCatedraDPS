import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "biblioteca",
});

db.connect(err => {
  if (err) {
    console.error("Error de conexión MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});
