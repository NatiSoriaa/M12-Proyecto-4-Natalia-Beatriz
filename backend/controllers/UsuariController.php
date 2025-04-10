<?php
// controllers/UsuariController.php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
require_once '../models/Usuari.php';
require_once '../config/twig.php';

// Instanciamos la clase UsuariController que gestionará las solicitudes
class UsuariController {
    private $usuariModel;
    private $twig;

    // Constructor del modelo Usuari y el motor Twig
    public function __construct() {
        $this->usuariModel = new Usuari();
        $this->twig = require '../config/twig.php';

    }
    // Función de registro
    public function registre() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // datos desde el body json 
            $data = json_decode(file_get_contents("php://input"), true);
            $nom = $data['nom'];
            $email = $data['email'];
            // Encriptamos la contraseña
            $contrasenya = password_hash($data['contrasenya'], PASSWORD_BCRYPT);

            // Creación de usuario y redirigimos a login
            if ($this->usuariModel->crearUsuari($nom, $email, $contrasenya)) {
                // ('Location: /MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login');
                // exit();
                echo json_decode(['success' => true, 'redirect' =>'/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login']);

            } else {
                echo json_decode(['success' => false, 'message' =>'Error en el registro.']);
            }
            exit();
        }
        // Renderizamos registre.html.twig
        echo $this->twig->render('usuari/registre.html.twig');

    }

    // Método login
    public function login() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // datos desde el frontend
            $data = json_decode(file_get_contents("php://input"), true);
            $email = $data['email'];
            $contrasenya = $data['contrasenya'];
            // Miramos si el email insertado existe en la base de datos
            $usuari = $this->usuariModel->obtenirUsuariPerEmail($email);
            // Si el email y la contraseña coinciden, empieza la sesión
            if ($usuari && password_verify($contrasenya, $usuari['contrasenya'])) {
                session_start();
                // Obtenemos el id, nombre y rol del usuario de aquella sesión
                $_SESSION['usuari_id'] = $usuari['id'];
                $_SESSION['nom'] = $usuari['nom'];
                $_SESSION['rol'] = $usuari['rol'];

                // Redirigimos al usuario en función de su rol
                if($_SESSION['rol'] === 'admin'){
                    echo json_encode(['success' => true, 'redirect' => '/MP07UF2PROJ_Abad-Beatriz/public/admin.php']);

                }elseif($_SESSION['rol'] === 'normal'){
                    echo json_encode(['success' => true, 'redirect' => '/MP07UF2PROJ_Abad-Beatriz/public/usuari.php']);
                } 
            //  exit();  // Termina el script 
            }else {
                echo json_encode(['success' => false, 'message' => 'Email o contrasenya incorrectes.']);
            }
            exit();
        }
        echo $this->twig->render('usuari/login.html.twig');
    }

    // Cerrar la sesión y redirige a login
    public function logout() {
        session_start(); // Iniciar o reanudar sesión 
        session_destroy(); // Cerrar sesión 
        header('Location: /MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login');
        exit();
    }
}
?>