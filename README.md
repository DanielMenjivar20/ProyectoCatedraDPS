# Proyecto Fase 2 — Biblioteca Digital

**Diseño y Programación de Software Multiplataforma**  
**Biblioteca Digital** con **API REST (Node.js + Express + MySQL)** y **Frontend (React Native + Expo)**.

---

## Guía de Instalación y Configuración

---

### 1. Clonar el proyecto

- git clone https://github.com/DanielMenjivar20/ProyectoCatedraDPS.git
- cd "nombre de la carpeta"

---

### 2. Instalar dependencias necesarias

**Backend (API)**
- cd biblioteca-app/BD-API
- npm install

**Frontend (App)**
- cd biblioteca-app/frontend
- npm install

---

### 3. Ejecutar los contenedores con Docker

El proyecto utiliza Docker Compose para levantar automáticamente la base de datos, el backend y el frontend.

Desde la raíz del proyecto ejecutar:
- docker-compose up --build

Esto creará el servicio de MySql, el servicio de Node.js con express y la app expo.
Cuando este inializado se mostrará que la API esta disponible.

---

### 4. Iniciar el sistema desde cero

- Verifica que Docker Desktop esté activo.
- Accede al navegador, emulador móvil o expo go para abrir la aplicación.

Si es necesario, reiniciar los contenedores usando los comandos:
- docker-compose down
- docker-compose up --build
