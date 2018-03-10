<?php

include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Usuario.php';

class AppDaoImp {

    public static function login($params) {
        $conn = (new C_MySQL())->open();

        $sql = "SELECT * FROM usuario where estado = 'ACT' and UPPER(u) = UPPER('" . $params["user"] . "') and DECODE(p,'pass') = '" . ($params["pass"]) . "';";

        $usuarios = C_MySQL::returnListAsoc($conn, $sql);
        $result = array(
            "status" => (count($usuarios) == 1),
            "usuario" => (count($usuarios) == 1) ? $usuarios[0] : NULL
        );

        $conn->close();
        return $result;
    }

    public static function save($usuario) {
        $conn = (new C_MySQL())->open();
        $sql = ($usuario->Id == 0) ? $usuario->Insert() : $usuario->Update();

        if ($conn->query($sql)) {
            if ($usuario->Id == 0) {
                $usuario->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }

    public static function _list($params) {
        $conn = (new C_MySQL())->open();
        $banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        $where = ($params["buscar"] != NULL) ? " where u like '%" . $params["buscar"] . "%' " : "";
        //where estado = 'ACT'
        $sql = "select SQL_CALC_FOUND_ROWS id, u, DECODE(p,'pass') p, estado,idrol from usuario $where $banderapag ;";

        $dts = array(
            "rows" => C_MySQL::returnListAsoc($conn, $sql),
            "total" => C_MySQL::row_count($conn)
        );
        $conn->close();
        return $dts;
    }

}
