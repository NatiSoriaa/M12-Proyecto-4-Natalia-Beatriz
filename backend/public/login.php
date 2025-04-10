{# public/login.html #}
<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>Inici de Sessió</title>
</head>
<body>
    <h1>Inici de Sessió</h1>
    <form method="POST" action="/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=login">
        <label for="email">Email:</label>
        <input type="email" name="email" required><br>

        <label for="contrasenya">Contrasenya:</label>
        <input type="password" name="contrasenya" required><br>

        <button type="submit">Iniciar Sessió</button>
    </form>
    <p>Encara no tens compte? <a href="/MP07UF2PROJ_Abad-Beatriz/public/index.php?action=registre">Registra't aquí</a>.</p>
</body>
</html>