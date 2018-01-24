<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Garantia.php';

class GarantiaDaoImp {
    public static function save($garantia) {
        $conn = (new C_MySQL())->open();
        $sql = "";
        if ($garantia->Id == 0) {
            $sql = $garantia->Insert();
        } else {
            $sql = $garantia->Update();
        }
        if ($conn->query($sql)) {
            if ($garantia->Id == 0) {
                $garantia->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }
    public static function _list($params, &$count) {
        $conn = (new C_MySQL())->open();
        $banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        //where estado = 'ACT'
        $sql = "select SQL_CALC_FOUND_ROWS * from garantia $banderapag ;";

        $list = C_MySQL::returnListAsoc($conn, $sql);
        $count = C_MySQL::row_count($conn);
        $conn->close();
        return $list;
    }
    public function delete($garantia) {
        $conn = (new C_MySQL())->open();
        $sql = $garantia->Update_Delete();
        $conn->query($sql);
        $conn->close();
    }
}
