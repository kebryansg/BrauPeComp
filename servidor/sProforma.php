<?php

require_once __DIR__ . "/../init.php";

include_once SITE_ROOT . '/MVC/Model/ProformaDaoImp.php';
include_once SITE_ROOT . '/MVC/Model/ProductoDaoImp.php';
include_once SITE_ROOT . '/MVC/Model/DetalleProformaDaoImp.php';
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
            case "DetallePorforma":
                $resultado = json_encode(DetalleProformaDaoImp::_list($_POST["idProforma"]));
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
                //$Profoma->Codigo = date_parse($Profoma->Fecha)["year"]. "-";
                ProformaDaoImp::save($Profoma);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));


                if (isset($_POST["detalles_delete"])) {
                    $detalles_delete = json_decode($_POST["detalles_delete"], TRUE);
                    DetalleProformaDaoImp::_removeMultiple($detalles_delete);
                }


                $detalles = json_decode($_POST["detalles"]);

                foreach ($detalles as $clave => $detalle) {
                    $detalleProforma = $mapper->map($detalle, new DetalleProforma());
                    $detalleProforma->Orden = $clave;
                    if ($detalleProforma->IdProducto === 0) {
                        $Producto = new Producto();
                        $Producto->Descripcion = $detalle->producto;
                        ProductoDaoImp::save($Producto);
                        $detalleProforma->IdProducto = $Producto->Id;
                    }
                    $detalleProforma->IdProforma = $Profoma->Id;
                    DetalleProformaDaoImp::save($detalleProforma);
                }
                break;
        }
        break;
}
echo $resultado;


