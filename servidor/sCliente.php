<?php

require_once __DIR__ . "/../init.php";

include_once SITE_ROOT . '/MVC/Model/ClienteDaoImp.php';
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
        //$top = (isset($_POST["limit"])) ? $_POST["limit"] : 0;
        //$pag = (isset($_POST["offset"])) ? $_POST["offset"] : 0;
        $count = 0;
        switch ($op) {
            case "cliente":
                $resultado = json_encode(array(
                    "rows" => ClienteDaoImp::_list($params, $count),
                    "total" => $count
                ));
                break;
        }
        break;
    case "save":
        if (array_key_exists("datos", $_POST)) {
            $json = json_decode($_POST["datos"]);
        }

        switch ($op) {
            case "cliente":
                $Cliente = $mapper->map($json, new Cliente());
                ClienteDaoImp::save($Cliente);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                break;
        }
        break;
    case "get":
        $resultado = json_encode(ClienteDaoImp::get($_POST["idCliente"]));
        break;
    case "delete":
        switch ($op) {
            case "cliente":
                $Cliente = new Cliente();
                $Cliente->Id =  $_POST["ids"];
                ClienteDaoImp::delete($Cliente);
                break;
        }
        break;
}
echo $resultado;


