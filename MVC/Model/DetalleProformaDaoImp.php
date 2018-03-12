<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/DetalleProforma.php';

class DetalleProformaDaoImp {

    public static function save($detalle) {
        $conn = (new C_MySQL())->open();
        $sql = ($detalle->Id == 0) ? $detalle->Insert() : $detalle->Update();
        if ($conn->query($sql)) {
            if ($detalle->Id == 0) {
                $detalle->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }
    
    public static function _list($idProforma) {
        $conn = (new C_MySQL())->open();
        //$banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        //$where = ($params["buscar"] != NULL) ? "where descripcion like '%" . $params["buscar"] . "%'" : "";

        //where estado = 'ACT'
        $sql = "select * from viewdetalleproforma where idProforma = $idProforma ;";

        $list = C_MySQL::returnListAsoc($conn, $sql);
//        $result = array(
//            "sql" => $sql,
//            "resultado" => $list,
//            "con" => $conn
//        );
        
        
        
        //$count = C_MySQL::row_count($conn);
        $conn->close();
        return $list;
//        return $result;
    }
    
    public static function _removeMultiple($ids) {
        $conn = (new C_MySQL())->open();
        $sql = "DELETE FROM detalleproforma where id in(" . join(',', $ids) . ");";
        $conn->query($sql);
        $conn->close();
    }

}
