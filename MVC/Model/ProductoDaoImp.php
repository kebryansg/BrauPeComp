<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Producto.php';

class ProductoDaoImp {

    public static function save($producto) {
        $conn = (new C_MySQL())->open();
        $sql = "";
        if ($producto->Id == 0) {
            $sql = $producto->Insert();
        } else {
            $sql = $producto->Update();
        }
        if ($conn->query($sql)) {
            if ($producto->Id == 0) {
                $producto->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }

    public static function _list($params, &$count) {
        $conn = (new C_MySQL())->open();
        $banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        $where = ($params["buscar"] != NULL) ? " and descripcion like '%" . $params["buscar"] . "%'" : "";

        //where estado = 'ACT'
        $sql = "select SQL_CALC_FOUND_ROWS * from producto where estado = 'ACT' $where $banderapag ;";

        $list = C_MySQL::returnListAsoc($conn, $sql);
        $count = C_MySQL::row_count($conn);
        $conn->close();
        return $list;
    }
    
    public function delete($value) {
        $conn = (new C_MySQL())->open();
        $sql = $value->Update_Delete();
        $conn->query($sql);
        $conn->close();
    }

}
