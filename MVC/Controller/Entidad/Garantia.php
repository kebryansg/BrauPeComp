<?php

include_once 'ModelSQL.php';
class Garantia extends ModelSQL {
    public $tabla;
    public $Id;
    public $Descripcion;

    function __construct() {
        $this->Id = 0;
        $this->tabla = "garantia";
    }
}
