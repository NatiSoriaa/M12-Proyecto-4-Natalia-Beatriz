<?php
// config/twig.php

// Cargar el autoloader de Composer para cargar las clases automáticamente
require_once __DIR__ . '/../vendor/autoload.php';

// Crear un cargador de archivos para las vistas de Twig, apuntando al directorio de vistas
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/../views');

// Crear el entorno de Twig, configurando el cargador y las opciones
$twig = new \Twig\Environment($loader, [
    'cache' => __DIR__ . '/../cache',  // Twig almacenará los archivos de caché
    'debug' => true,                    // Modo depuración
]);

// Añadir la variable global 'session' a todas las vistas para acceder a $_SESSION directamente
$twig->addGlobal('session', $_SESSION);

// Devolver el objeto Twig
return $twig;
?>
