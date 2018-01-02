<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Configuracion.php';
//include_once '../MVC/Controller/C_MySQL.php';
//include_once '../MVC/Controller/Entidad/Configuracion.php';

class ConfiguracionDaoImp {

    public static function save($config) {
        $conn = (new C_MySQL())->open();
        $sql = "";
        if ($config->Id == 0) {
            $sql = $config->Insert();
        } else {
            $sql = $config->Update();
        }
        if ($conn->query($sql)) {
            if ($config->Id == 0) {
                $config->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }

    public static function get() {
        $conn = (new C_MySQL())->open();
        $sql = "select * from configuracion;";

        $list = C_MySQL::returnListAsoc($conn, $sql);
        $conn->close();
        return $list;
    }

    public static function updateLogo($destino) {
        $conn = (new C_MySQL())->open();
        $sql = "update configuracion set logo ='" . $destino . "';";
        $conn->query($sql);
        $conn->close();
    }

}
