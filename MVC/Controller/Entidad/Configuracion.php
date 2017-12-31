<?php
include_once 'ModelSQL.php';

class Configuracion extends ModelSQL {
    public $tabla;
    public $Id;
    public $Nombre;
    public $Direccion;
    public $RUC;
    public $Telefono;
    public $Celular;
    public $Email;
    public $Logo;

    function __construct() {
        $this->Id = 0;
        $this->Logo = "";
        $this->tabla = "configuracion";
    }
}