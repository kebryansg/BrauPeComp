<?php

require_once __DIR__ . "/../init.php";

include_once SITE_ROOT . '/MVC/Model/ConfiguracionDaoImp.php';


$imagen = $_FILES["file"];
//$name = $imagen["name"];
//$name = 'logo.' . explode(".", $imagen["name"])[1];
$name = 'logo.png';
$tmp_name = $imagen["tmp_name"];

$destino = (dirname(dirname(__FILE__))) . "\\resource\\ConfigIMG";
// Verificamos que exista el destino, si no, lo creamos
if ($destino != "" and ! is_dir($destino)) {
    mkdir($destino, 0775);
}
$destino = $destino . "\\" . $name;

if (move_uploaded_file($tmp_name, $destino)) {
    $destino = "resource/ConfigIMG/" . $name;
    ConfiguracionDaoImp::updateLogo($destino);
}

