<?php

require_once __DIR__ . "/../init.php";

include_once SITE_ROOT . '/MVC/Model/AppDaoImp.php';
include_once SITE_ROOT . '/MVC/Controller/JsonMapper.php';

$accion = $_POST["accion"];
$op = $_POST["op"];
$mapper = new JsonMapper();
$resultado = "";

switch ($accion) {
    case "list":
        $params = array(
            "top" => (isset($_POST["limit"])) ? $_POST["limit"] : 0,
            "pag" => (isset($_POST["offset"])) ? $_POST["offset"] : 0,
            "buscar" => (isset($_POST["search"])) ? $_POST["search"] : NULL
        );
        
        switch ($op) {
            case "usuario":
                $resultado = json_encode(AppDaoImp::_list($params));
                break;
        }
        
        
        break;
    case "save":
        if (array_key_exists("datos", $_POST)) {
            $json = json_decode($_POST["datos"]);
        }

        switch ($op) {
            case "usuario":
                $Usuario = $mapper->map($json, new Usuario());
                //$Usuario->p = sha1($Usuario->p);
                AppDaoImp::save($Usuario);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                break;
        }
        break;
    case "login":
        $params = array(
            "user" => $_POST["u"],
            "pass" => $_POST["p"]
        );
        $resp = AppDaoImp::login($params);

        if ($resp["status"]) {
            session_start();
            $_SESSION["user"] = $resp["usuario"];
        }
        $resultado = "{status: ". $resp["status"] ." }";
        break;
    case "close":
        session_destroy();
        break;
}
echo $resultado;
