<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulari de Contacte</title>
</head>
<body>
    <h2>Contacta'ns</h2>
    <form action="../functions.php" method="POST" enctype="multipart/form-data">
        <label>Nom:</label>
        <input type="text" name="nom" required><br>

        <label>Correu electrònic:</label>
        <input type="email" name="correu" required><br>

        <label>Missatge:</label>
        <textarea name="missatge" required></textarea><br>

        <label>Adjuntar fitxer (opcional):</label>
        <input type="file" name="fitxer"><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
