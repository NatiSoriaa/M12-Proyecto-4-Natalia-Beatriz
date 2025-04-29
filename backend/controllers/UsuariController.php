<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../models/Usuari.php';
require_once '../config/config.php';
require_once '../config/twig.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

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
            header('Content-Type: application/json');
            
            // datos desde el body json 
            $data = json_decode(file_get_contents("php://input"), true);
            $nom = $data['nom'];
            $email = $data['email'];
            $contrasenya = password_hash($data['contrasenya'], PASSWORD_BCRYPT);

            // Creación de usuario y redirigimos a login
            if ($this->usuariModel->crearUsuari($nom, $email, $contrasenya)) {
                // envia json al frontend
                echo json_encode(['success' => true, 'redirect' =>'M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=login']);
            //instanciem la classe PHPMailer
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            try {
                //primer configurem PHPMailer per utilitzar SMTP
                $mail->isSMTP(); //ús del protocol SMTP
                $mail->Host = SMTP_HOST; //servidor SMTP
                $mail->SMTPAuth = true; //autenticacio
                $mail->Username = SMTP_USER; //username per a l'autenticacio
                $mail->Password = SMTP_PASS; //contrassenya
                //connexió segura amb STARTTLS
                $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = SMTP_PORT; //port SMTP per a STARTTLS
                
                //adreça del usuari com a remitent
                $mail->setFrom($email, $nom);
                $mail->addAddress('beatrizabadjim@gmail.com', 'bea');

                //contingut del correu
                $mail->isHTML(true); //format HTML
                $mail->Subject = 'Welcome to Earth Explorer';
                $mail->Body = $missatge; //missatge a l'user
                $missatge = "Hey there $nom! You just registered to get the best experience";
                // //quan s'envia el correu, 
                // if ($mail->send()) {
                //     //redirigim a success.php
                //     header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/success.php");
                //     exit();
                // }
            //en cas de sorgir errors al correu, 
            } catch (Exception $e) {
                //es registra a error.log
                error_log("Error al enviar el correu: " . $mail->ErrorInfo, 3, '.logs/error.log');
                $mail->SMTPDebug = 2; // Muestra información detallada de la conexión SMTP
                $mail->Debugoutput = 'html';

                header("Location: http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/error.php?error=send_fail");
                exit();
            }
                } else {
                    echo json_encode(['success' => false, 'message' =>'El email ya está registrado en la base de datos.']);
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
                    echo json_encode(['success' => true, 'redirect' => 'M12-Proyecto-4-Natalia-Beatriz/backend/public/admin.php']);

                }elseif($_SESSION['rol'] === 'normal'){
                    echo json_encode(['success' => true, 'redirect' => 'M12-Proyecto-4-Natalia-Beatriz/backend/public/usuari.php']);
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
        header('Location: M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=login');
        exit();
    }
}
?>