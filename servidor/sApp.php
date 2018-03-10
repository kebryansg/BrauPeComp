<?php

require_once __DIR__ . "/../init.php";

include_once SITE_ROOT . '/MVC/Model/AppDaoImp.php';
include_once SITE_ROOT . '/MVC/Controller/JsonMapper.php';

$accion = $_POST["accion"];
$op = (array_key_exists("op", $_POST)) ? $_POST["op"] : "";
$mapper = new JsonMapper();
$resultado = "";

switch ($accion) {
    case "list":
        $params = array(
            "top" => (isset($_POST["limit"])) ? $_POST["limit"] : 0,
            "pag" => (isset($_POST["offset"])) ? $_POST["offset"] : 0,
            "buscar" => (isset($_POST["search"])) ? $_POST["search"] : NULL
        );

        switch ($op) {
            case "usuario":
                $resultado = json_encode(AppDaoImp::_list($params));
                break;
        }
        break;
    case "save":
        if (array_key_exists("datos", $_POST)) {
            $json = json_decode($_POST["datos"]);
        }

        switch ($op) {
            case "usuario":
                $Usuario = $mapper->map($json, new Usuario());
                AppDaoImp::save($Usuario);
                $resultado = json_encode(array(
                    "status" => TRUE,
                    "Mensaje" => "Registrado Correctamente"
                ));
                break;
        }
        break;
    case "login":
        $params = array(
            "user" => $_POST["u"],
            "pass" => $_POST["p"]
        );
        $resp = AppDaoImp::login($params);

        if ($resp["status"]) {
            session_start();
            $_SESSION["login"] = array(
                "status" => true,
                "user" => $resp["usuario"]
            );
            $resultado = array(
                "status" => $resp["status"],
                "location" => "."
            );
        } else {
            $resultado = array(
                "status" => $resp["status"],
                "mjs" => "Error al autenticar."
            );
        }
        $resultado = json_encode($resultado);
        break;
    case "close":
        session_start();

// Destruir todas las variables de sesión.
        $_SESSION = array();

// Si se desea destruir la sesión completamente, borre también la cookie de sesión.
// Nota: ¡Esto destruirá la sesión, y no la información de la sesión!
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]
            );
        }

// Finalmente, destruir la sesión.
        session_destroy();
        break;
}
echo $resultado;
