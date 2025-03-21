-- Crear la base de datos (opcional)
CREATE DATABASE IF NOT EXISTS earth_explorer;
USE earth_explorer;

-- Crear la tabla "user_History"
CREATE TABLE user_history (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    favorite TINYINT(1) NOT NULL,
    date DATETIME NOT NULL,

);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
);
