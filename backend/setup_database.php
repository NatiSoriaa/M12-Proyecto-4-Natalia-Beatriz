<?php
// setup_database.php

// Datos de conexión sin especificar DB
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'earth_explorer_db';

try {
    // Conexión inicial sin base de datos especificada
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 1. Crear la base de datos si no existe
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    $pdo->exec("USE $dbname");

    // 2. Crear tabla de usuarios
    $pdo->exec("CREATE TABLE IF NOT EXISTS usuaris (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        contrasenya VARCHAR(255) NOT NULL,
        rol ENUM('admin', 'normal') DEFAULT 'normal'
    )");

    // 3. Insertar usuarios con contraseñas hasheadas
    $passwordAdmin = password_hash('admin123', PASSWORD_BCRYPT); 
    $passwordNormal = password_hash('user123', PASSWORD_BCRYPT); 

    $stmt = $pdo->prepare("INSERT INTO usuaris (nom, email, contrasenya, rol) VALUES (?, ?, ?, ?)");
    
    $stmt->execute(['Admin Usuari', 'admin@example.com', $passwordAdmin, 'admin']);
    $stmt->execute(['Normal Usuari', 'user@example.com', $passwordNormal, 'normal']);

    // 4. Crear tabla de favoritos
    $pdo->exec("CREATE TABLE IF NOT EXISTS user_favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        descripcio TEXT,
        categoria VARCHAR(255) NOT NULL,
        usuari_id INT NOT NULL,
        data_afegit DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuari_id) REFERENCES usuaris(id) ON DELETE CASCADE
    )");

    // 5. Insertar datos de ejemplo
    $stmtFav = $pdo->prepare("INSERT INTO user_favorites (nom, descripcio, categoria, usuari_id) VALUES (?, ?, ?, ?)");
    $stmtFav->execute(['Paella', 'Arroz con cosas', 'Comida', 1]);

    echo "Base de datos y tablas creadas correctamente!<br>";
    echo '<a href="http://localhost/MP07UF2PROJ_Abad-Beatriz/public/index.php">Ver anuncios</a>';

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}