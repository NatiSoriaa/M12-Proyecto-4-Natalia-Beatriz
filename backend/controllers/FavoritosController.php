<?php
// controllers/AnunciController.php

require_once '../models/Favoritos.php';
require_once '../config/twig.php';
require_once '../includes/auth.php';

// Definimos la clase AnunciController que manejará las solicitudes 
class FavoritosController {
    private $favoritosModel;
    private $twig;

    // Inicializamos el modelo Anuncio y el motor Twig
    public function __construct() {
        global $pdo; 
        $this->favoritosModel = new Favoritos($pdo);
        $this->twig = require '../config/twig.php';
    }

    // Método para hacer una solicitud API usando cURL
    private function apiRequest($url, $method, $data = null) {
        $ch = curl_init();
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    
        if ($data) {
            // Si hay datos se incluyen en la solicitud
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        // Ejecución de la solicitud y cierre
        $result = curl_exec($ch);
        curl_close($ch);
        
        // Devuelve un array asociativo
        return json_decode($result, true); 
    }

    // Llistat d'anuncis
    public function index() {
        $favoritos = $this->favoritosModel->obtenirFavoritos();
        // Renderiza la plantilla index.html.twig y pasa los anuncios a view
        echo $this->twig->render('index.html.twig', ['favoritos' => $favoritos]);
    }

    // Método que hace una solicitud POST para crear un anuncio
    public function crear() {
        check_auth('admin'); // Verificación de los permisos

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Recull les dades del formulari
            $data = [
                'titol' => $_POST['titol'],
                'descripcio' => $_POST['descripcio'],
                'categoria' => $_POST['categoria'],
                'usuari_id' => $_SESSION['usuari_id'] // Conocer el id del usuario que ha subido el anuncio
            ];
            // Solicitud POST a nuestra api anunci_api.php
            $url = "http://localhost/MP07UF2PROJ_Abad-Beatriz/api/anunci_api.php";
            $response = $this->apiRequest($url, 'POST', $data);

            // Redirigir el usuario en función del estado de la respuesta
            if ($response && $response['status'] === 'success') { 
                header('Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=anuncis');
                exit();
            } else {
                echo "Error en la creació de l'anunci.";
                if ($response) {
                    echo " Detalls: " . $response['message'];  
                }
            }
        } else {
            echo $this->twig->render('favoritos/crear.html.twig');
        }
    }

    // Modificar anunci
    public function modificar($id){
        check_auth('admin');
        // Obtención del id a modificar
        $favoritos = $this->favoritosModel->obtenirFavoritoPerId($id);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Datos del formulario
            $data = [
                'titol' => $_POST['titol'],
                'descripcio' => $_POST['descripcio'],
                'categoria' => $_POST['categoria'],
            ];

            // Solicitud PUT a la api
            $url = "http://localhost/MP07UF2PROJ_Abad-Beatriz/api/anunci_api.php?id=$id";
            $response = $this->apiRequest($url, 'PUT', $data);

            if ($response && $response['status'] === 'success') {  
                header('Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=anuncis');
                exit();
            } else {
                echo "Error en la modificación del anuncio.";
                if ($response) {
                    echo " Detalls: " . $response['message'];  
                }
            }
        } else {
            $favoritos = $this->favoritosModel->obtenirFavoritoPerId($id);
    
            if ($anunci) {
                echo $this->twig->render('anunci/modificar.html.twig', ['anunci' => $anunci]);
            } else {
                echo "El anuncio no fue encontrado.";
            }
        }
    }

    // Eliminar anunci
    public function eliminar($id) {
        check_auth('admin'); // Verificación de permisos
        
        $url = "http://localhost/MP07UF2PROJ_Abad-Beatriz/api/anunci_api.php?id=$id";
        $response = $this->apiRequest($url, 'DELETE');

        if ($response && $response['status'] === 'success') { 
            header('Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=anuncis');
            exit();
        } else {
            echo "Error en l'eliminació de l'anunci.";
            if ($response) {
                echo " Detalls: " . $response['message']; 
            }
        }
    }
}
?>