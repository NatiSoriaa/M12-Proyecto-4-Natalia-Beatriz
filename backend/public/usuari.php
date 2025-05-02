<?php
//incluimos el archivo de autenticación, donde se verifica que el usuario esté logueado y tenga el rol adecuado
include '../includes/auth.php';
//verificamos que el user tenga el rol de admin
?>
<!DOCTYPE html>
<html>
<head>
    <title>Pàgina d'Usuari Normal</title>
</head>
<body>
    <h1>Benvingut Usuari Normal! </h1>
    <!-- Accions del usuari normal -->
    <a href="http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=obtenerFavoritos">Veure llistat d'anuncis</a><br>
    <a href="http://localhost/M12-Proyecto-4-Natalia-Beatriz/backend/public/index.php?action=logout">Tancar la sessió</a>
</body>
</html>
