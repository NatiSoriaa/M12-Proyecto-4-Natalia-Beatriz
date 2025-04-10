<?php
//libreries necessaries 
require_once __DIR__ . '../vendor/autoload.php';
require_once __DIR__ . '../config/config.php';

//validem si el correu té format vàlid amb filter_var i FILTER_VALIDATE_EMAIL
//retorna true si és vàlid
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

//validem el fitxer adjunt:
function validarAdjunt($file) {
    //al ser opcional considerem que no hi ha cap fitxer adjunt
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return true;
    }
    //comprovem la mida del fitxer, que limitem a 2MB
    if ($file['size'] > 2 * 1024 * 1024) { 
        return false;
    }
    //i per ultim comprovem el MIME (JPEG, PNG, PDF...)
    $mime_types = ['image/jpeg', 'image/png', 'application/pdf'];
    return in_array($file['type'], $mime_types);
}

//si el formulari s'envia per POST:
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    //recull lles dades del usuari
    $nom = $_POST['nom'];
    $correu = $_POST['correu'];
    $missatge = $_POST['missatge'];
    $adjunt = $_FILES['fitxer'];

    //validem les dades
    //si estan buides:
    if (empty($nom) || empty($correu) || empty($missatge)) {
        //redirigim a error.php amb el missatge d'error
        header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/error.php?error=camp_buit");
        exit();
    }
    //validem el correu si es correcte
    if (!validarEmail($correu)) {
        header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/error.php?error=email_invalid");
        exit();
    }

    //validem el fitxer adjunt
    if (!validarAdjunt($adjunt)) {
        header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/error.php?error=fitxer_invalid");
        exit();
    }

    //enviaem el correu amb PHPMailer
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
        $mail->setFrom($correu, $nom);
        $mail->addAddress('beatrizabadjim@gmail.com', 'bea');

        //si s'ha adjuntat un fixer, l'afegim al correu
        if ($adjunt['error'] === UPLOAD_ERR_OK) {
            //
            $mail->addAttachment($adjunt['tmp_name'], $adjunt['name']);
        }

        //contingut del correu
        $mail->isHTML(true); //format HTML
        $mail->Subject = 'TESTITO';
        $mail->Body = $missatge; //missatge a l'user

        //quan s'envia el correu, 
        if ($mail->send()) {
            //redirigim a success.php
            header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/success.php");
            exit();
        }
    //en cas de sorgir errors al correu, 
    } catch (Exception $e) {
        //es registra a error.log
        error_log("Error al enviar el correu: " . $mail->ErrorInfo, 3, 'logs/error.log');
        $mail->SMTPDebug = 2; // Muestra información detallada de la conexión SMTP
        $mail->Debugoutput = 'html';

        header("Location: http://localhost/MP07UF2PROJ_Abad-Beatriz/public/error.php?error=send_fail");
        exit();
    }
}
?>

