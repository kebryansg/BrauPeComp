<?php

include_once 'ModelSQL.php';
class Usuario extends ModelSQL {
    public $tabla;
    public $Id;
    public $U;
    public $P;
    public $IdRol;
    public $Estado;

    function __construct() {
        $this->Id = 0;
        $this->Estado = 'ACT';
        $this->tabla = "usuario";
    }
}
