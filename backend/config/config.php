<?php

//configurem les credencials per a l'enviament de correus amb PHPMailer
//configuracio servidor SMTP
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USER', 'beatriz.abad@estudiant.fjaverianas.com');
define('SMTP_PASS', 'kjtv zofn owmt kpjy');
define('SMTP_PORT', 587); //port SMTP per a connexió segura

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, Cache-Control");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
