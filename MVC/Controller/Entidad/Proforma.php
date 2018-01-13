<?php

include_once 'ModelSQL.php';

class Proforma extends ModelSQL {
    public $tabla;
    public $Id;
    public $Codigo;
    public $Fecha;
    public $Cliente;
    public $Ganancia;

    function __construct() {
        $this->Id = 0;
        $this->Codigo = "prof-";
        $this->tabla = "proforma";
    }
}