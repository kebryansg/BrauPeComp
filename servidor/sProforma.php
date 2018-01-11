<?php
require_once __DIR__."/../init.php";

include_once SITE_ROOT . '/MVC/Model/ProformaDaoImp.php';
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
            case "proforma":
                $resultado = json_encode(array(
                    "rows" => ProformaDaoImp::_list($params, $count),
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
            case "proforma":
                $Profoma = $mapper->map($json, new Proforma());
                ProformaDaoImp::save($Profoma);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                
                $detalles = json_decode($_POST["detalles"], TRUE);
                foreach ($detalles as $detalle) {
                    if($detalle["id"] === 0){
                        $Producto = new Producto();
                        $Producto->Descripcion = $detalle["producto"];
                        ProductoDaoImp::save($Producto);
                        $detalle["id"] = $Producto->Id;
                    }
                    $detalle["producto"] = $detalle["id"];
                    $detalle["proforma"] = $Profoma->Id;
                    ProformaDaoImp::saveDetalle($detalle);
                }
                
                
                
                break;
        }
        break;
}
echo $resultado;


