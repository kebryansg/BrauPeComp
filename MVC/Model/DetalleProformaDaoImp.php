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

}
