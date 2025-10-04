CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol ENUM('estudiante', 'administrador') NOT NULL
);

CREATE TABLE Libro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    estado ENUM('disponible', 'prestado', 'baja') DEFAULT 'disponible'
);

CREATE TABLE Prestamo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    estado ENUM('activo', 'finalizado') DEFAULT 'activo',
    usuario_id INT,
    libro_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (libro_id) REFERENCES Libro(id)
);

CREATE TABLE Administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE GestionUsuarios (
    admin_id INT,
    usuario_id INT,
    PRIMARY KEY (admin_id, usuario_id),
    FOREIGN KEY (admin_id) REFERENCES Administrador(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE GestionLibros (
    admin_id INT,
    libro_id INT,
    PRIMARY KEY (admin_id, libro_id),
    FOREIGN KEY (admin_id) REFERENCES Administrador(id),
    FOREIGN KEY (libro_id) REFERENCES Libro(id)
);
