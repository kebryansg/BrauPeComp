<?php
require_once __DIR__."/../init.php";

include_once SITE_ROOT . '/MVC/Model/ProductoDaoImp.php';
include_once SITE_ROOT . '/MVC/Controller/JsonMapper.php';

$accion = $_POST["accion"];
$op = $_POST["op"];
$mapper = new JsonMapper();
$resultado = "";

switch ($accion) {
    case "list":
        $params = array(
            "top" => (isset($_POST["limit"])) ? $_POST["limit"] : 0,
            "pag" => (isset($_POST["offset"])) ? $_POST["offset"] : 0
        );
        $count = 0;
        switch ($op) {
            case "producto":
                $resultado = json_encode(array(
                    "rows" => ProductoDaoImp::_list($params, $count),
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
            case "producto":
                $Producto = $mapper->map($json, new Producto());
                ProductoDaoImp::save($Producto);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                break;
        }
        break;
}
echo $resultado;


