<?php

include_once 'ModelSQL.php';
class Cliente extends ModelSQL {
    public $tabla;
    public $Id;
    public $Nombres;
    public $TipoIdentificacion;
    public $Identificacion;
    public $Telefono;
    public $Celular;
    public $Email;
    public $Direccion;
    //public $Logo;

    function __construct() {
        $this->Id = 0;
        //$this->Logo = "";
        $this->tabla = "cliente";
    }
}