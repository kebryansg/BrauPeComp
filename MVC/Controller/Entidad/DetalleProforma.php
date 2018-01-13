<?php
include_once 'ModelSQL.php';

class DetalleProforma extends ModelSQL {
    public $tabla;
    public $Id;
    public $IdProforma;
    public $IdProducto;
    public $Cantidad;
    public $precioProveedor;
    public $precioComision;
    //public $Logo;

    function __construct() {
        $this->Id = 0;
        $this->tabla = "detalleproforma";
    }
}
