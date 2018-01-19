<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Cliente.php';

class ClienteDaoImp {

    public static function save($cliente) {
        $conn = (new C_MySQL())->open();
        $sql = "";
        if ($cliente->Id == 0) {
            $sql = $cliente->Insert();
        } else {
            $sql = $cliente->Update();
        }
        if ($conn->query($sql)) {
            if ($cliente->Id == 0) {
                $cliente->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }
    public static function get($idCliente) {
        $conn = (new C_MySQL())->open();
        $sql = "select SQL_CALC_FOUND_ROWS * from cliente where id = $idCliente ;";

        $cliente = C_MySQL::returnListAsoc($conn, $sql)[0];
        $conn->close();
        return $cliente;
    }
    

    public static function _list($params, &$count) {
        $conn = (new C_MySQL())->open();
        $banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        $where = ($params["buscar"] != NULL) ? "where nombres like '%" . $params["buscar"] . "%' or identificacion like '%" . $params["buscar"] . "%' " : "";
        //where estado = 'ACT'
        $sql = "select SQL_CALC_FOUND_ROWS * from cliente $where  $banderapag ;";

        $list = C_MySQL::returnListAsoc($conn, $sql);
        $count = C_MySQL::row_count($conn);
        $conn->close();
        return $list;
    }

}
