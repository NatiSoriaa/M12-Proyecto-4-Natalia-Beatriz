<?php
// api/anunci_api.php

require_once '../models/Favoritos.php';
require_once '../includes/auth.php';
require_once '../config/db.php';
require_once '../config/config.php';

// Salida en formato JSON
header('Content-Type: application/json');

// Inicia la sesión si no está iniciada aún
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Instancia el modelo Anunci para usar sus métodos
$favoritosModel = new Favoritos($pdo);

// Obtención del método HTTP (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

// Gestión de la solicitudes
switch ($method) {
    
    // Llistat d'anuncis
    case 'GET':
        $favoritos = $favoritosModel->obtenerFavoritos();
        echo json_encode(['success' => true, 'data' => $favoritos]);
        break;
    // Publicació
    case 'POST':
        // Obtención de datos en formato JSON y decodificarlos
        $data = json_decode(file_get_contents('php://input'), true);

        // Uso método del objeto para crear un nuevo anuncio
        if ($favoritosModel->crearFavorito($data['nom'], $data['descripcio'], $data['categoria'], $data['usuari_id'])) {
            echo json_encode(['status' => 'success', 'message' => 'Anunci creat correctament.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error en la creació de l\'anunci.']);
        }
        break;

    // Actualitzar
    case 'PUT':
        // Obtención del id desde la URL
        $id = $_GET['id'] ?? null;
        $input = file_get_contents('php://input'); // Cuerpo de la solicitud
        $data = json_decode($input, true); // Decodificar el JSON recibido
        
        if (!$data) {
            echo json_encode(['status' => 'error', 'message' => 'Dades JSON invàlides']);
            exit();
        }
        // Si se obtienen los datos y el id correctamente se llama al método actualitzarAnnunci
        if ($id && isset($data['nom'], $data['descripcio'], $data['categoria'])) {
            if ($anunciModel->actualitzarAnunci($id, $data['titol'], $data['descripcio'], $data['preu'], $data['categoria'])) {
                echo json_encode(['status' => 'success', 'message' => 'Anunci actualitzat correctament.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error en l\'actualització de l\'anunci.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Falten dades o ID de l\'anunci no proporcionat.']);
        }
        break;
    
    // Eliminar un anunci
    case 'DELETE':
        // Obtención del id
        $id = $_GET['id'] ?? null;

        if ($id) { // Si obtenemos el id, eliminamos el anuncio
            if ($favoritosModel->eliminarFavorito($id)) {
                echo json_encode(['status' => 'success', 'message' => 'Anunci eliminat correctament.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error en l\'eliminació de l\'anunci.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'ID de l\'anunci no proporcionat.']);
        }
        break;

    // Cuando se usa un método HTTP no permitido
    default:
        echo json_encode(['status' => 'error', 'message' => 'Mètode no permès.']);
        break;
}
?>