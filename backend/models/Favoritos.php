<?php
// models/Anunci.php

require_once 'Model.php';
require_once '../config/db.php';

class Favoritos extends Model {
    // Anunci hereda la conexión a la base de datos de la clase Model
    public function __construct($pdo) {
        parent::__construct($pdo);
    }
    // Query SQL para obtener anuncios
    public function obtenerFavoritos() {
        $stmt = $this->pdo->query("SELECT * FROM user_favorites");
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna un array asociativo 
    }

    // Query SQL para obtener anuncio por id
    public function obtenirFavoritoPerId($id){
        $stmt = $this->pdo->prepare('SELECT * from user_favorites where id = ?');
        $stmt->execute([$id]); // Consulta ejecutada con el id
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Query SQL para crear un anuncio
    public function crearFavorito($nom, $descripcio, $categoria, $usuari_id) {
        $stmt = $this->pdo->prepare("INSERT INTO user_favorites (nom, descripcio, categoria, usuari_id) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$titol, $descripcio, $preu, $categoria, $usuari_id]);
    }

    // Query SQL para eliminar un favorito
        public function eliminar($id, $usuari_id) {
            $stmt = $this->pdo->prepare("DELETE FROM user_favorites WHERE id = ? AND usuari_id = ?");
            return $stmt->execute([$id, $usuari_id]);
        }
    

    // Query SQL paraactualitzar un anunci
    public function actualitzarFavorito($id, $nom, $descripcio, $categoria) {
        $stmt = $this->pdo->prepare("UPDATE user_favorites SET nom = ?, descripcio = ?, preu = ?, categoria = ? WHERE id = ?");
        return $stmt->execute([$titol, $descripcio, $preu, $categoria, $id]);
    }
    
    // Query SQL para añadir elemento a favoritos
    public function añadirAFavoritos($nom, $descripcio, $categoria, $url, $usuari_id) {
        $stmt = $this->pdo->prepare("INSERT INTO user_favorites (nom, descripcio, categoria, url, usuari_id) VALUES (?, ?, ?, ?, ?)");
        return $stmt->execute([$nom, $descripcio, $categoria, $url, $usuari_id]);
    }
}
?>