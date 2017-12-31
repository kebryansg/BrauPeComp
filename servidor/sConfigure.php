<?php

include_once '../MVC/Model/ConfiguracionDaoImp.php';

include_once '../MVC/Controller/JsonMapper.php';
$accion = $_POST["accion"];
$op = $_POST["op"];
$mapper = new JsonMapper();
$resultado = "";

switch ($accion) {
    case "get":
        switch ($op) {
            case "configuracion":
                $resultado = json_encode(ConfiguracionDaoImp::get());
                break;
        }
        break;
    case "save":
        if (array_key_exists("datos", $_POST)) {
            $json = json_decode($_POST["datos"]);
        }

        switch ($op) {
            case "configuracion":
                $Configuracion = $mapper->map($json, new Configuracion());
                ConfiguracionDaoImp::save($Configuracion);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                break;
            case "logo":
                $imagen = $_FILES["imagen"];
                $name = $imagen["name"];
                $tmp_name = $imagen["tmp_name"];

                $destino = (dirname(dirname(__FILE__))) . "\\resource\\ConfigIMG";
                // Verificamos que exista el destino, si no, lo creamos
                if ($destino != "" and ! is_dir($destino)) {
                    mkdir($destino, 0775);
                }

                move_uploaded_file($tmp_name, $destino . "\\" .$name);
                break;
        }
        break;
}
echo $resultado;


