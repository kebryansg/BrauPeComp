<?php

include_once 'ModelSQL.php';

class Proforma extends ModelSQL {
    public $tabla;
    public $Id;
    public $Codigo;
    public $Fecha;
    public $IdCliente;
    public $Ganancia;
    public $Envio;
    public $IdGarantia;

    function __construct() {
        $this->Id = 0;
        $this->Codigo = "prof-";
        $this->tabla = "proforma";
    }
}