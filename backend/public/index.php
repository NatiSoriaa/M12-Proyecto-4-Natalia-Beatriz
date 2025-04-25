<?php

// Inicia la sesión si aún no se ha iniciado
if (session_status() == PHP_SESSION_NONE) {
    session_start();  // Comienza la sesión
}

// Incluye los controladores necesarios
require_once '../controllers/UsuariController.php';  // Controlador de usuarios
require_once '../controllers/FavoritosController.php';  // Controlador de anuncios

// Obtiene la acción solicitada desde la URL, por defecto es 'index'
$action = $_GET['action'] ?? 'index';  // Usa 'index' si no hay 'action'

// Crea instancias de los controladores
$usuariController = new UsuariController();  // Controlador de usuarios
$favoritosController = new FavoritosController();  // Controlador de anuncios

// Procesa la acción solicitada
switch ($action) {
    case 'register':  // Registra un nuevo usuario
        $usuariController->registre();
        break;
    case 'login':  // Inicia sesión
        $usuariController->login();
        break;
    case 'logout':  // Cierra sesión
        $usuariController->logout();
        break;
    case 'crear-anunci':  // Crea un anuncio
        $favoritosController->crear();
        break;
    case 'modificar':  // Modifica un anuncio
        if (isset($_GET['id'])){  // Verifica si 'id' está presente
            $id = $_GET['id'];  // Obtiene el ID del anuncio
            $favoritosController->modificar($id);  // Llama al controlador para modificar
        } else {
            echo 'Id al intentar recuperar el id';  // Error si no se pasa el 'id'
        }
        break;
    case 'eliminar':  // Elimina un anuncio
        if (isset($_GET['id'])) {  // Verifica si 'id' está presente
            $id = $_GET['id'];  // Obtiene el ID del anuncio
            $favoritosController->eliminar($id);  // Llama al controlador para eliminar
        } else {
            echo 'ID no proporcionado al intentar eliminar el anuncio';  // Error si no se pasa el 'id'
        }
        break;
    case 'anuncis':  // Muestra el listado de anuncios
        $favoritosController->index();
        break;
    default:  // Acción por defecto, redirige si no se encuentra ninguna acción
        header('Location:/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=anuncis');
        exit();  // Evita que se siga ejecutando el código
}
?>
