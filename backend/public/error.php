<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>Error</title>
</head>
<body>
    <h2>Error en l'enviament del missatge</h2>

    <?php
    //en cas d'haver errors
    //missatge diferent segons l'error:

    if (isset($_GET['error'])) {
        switch ($_GET['error']) {
            case 'camp_buit':
                echo "<p>Tots els camps obligatoris han de ser omplerts.</p>";
                break;
            case 'email_invalid':
                echo "<p>Correu electrònic no vàlid.</p>";
                break;
            case 'fitxer_invalid':
                echo "<p>El fitxer no és vàlid o és massa gran.</p>";
                break;
            case 'send_fail':
                echo "<p>No s'ha pogut enviar el missatge. Torna-ho a intentar.</p>";
                break;
            default:
                echo "<p>Hi ha hagut un error desconegut.</p>";
        }
    }
    ?>
    
    <a href="index.php">Tornar</a>
</body>
</html>
