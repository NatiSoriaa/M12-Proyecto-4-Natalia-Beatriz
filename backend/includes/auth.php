<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

function check_auth($required_role = null) {
        // Verifica si el usuario está autenticado (si existe en la sesión)
        if (!isset($_SESSION['usuari_id'])) {
            header("Location: login.php");
            exit();
        }
        // Verifica si se requiere un rol específico y si el usuario no tiene ese rol
        if ($required_role && $_SESSION['rol'] !== $required_role) {
            header("Location: usuari.php"); // El user Normal se va a su página
            exit();
        }
}
?>