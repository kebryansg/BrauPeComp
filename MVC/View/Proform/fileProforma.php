<!DOCTYPE html>
<link rel="stylesheet" href="../../../resource/Plantilla/bootstrap/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="../../../resource/table/bootstrap-table.min.css">
<link rel="stylesheet" href="../../../resource/dist/css/file.css">
<script src="../../../resource/Plantilla/jquery/dist/jquery.min.js"></script>
<script src="../../../resource/Plantilla/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="../../../resource/table/bootstrap-table.min.js"></script>
<script src="../../../resource/dist/js/jquery.inputmask.bundle.min.js"></script>
<script src="../../../resource/dist/js/html2canvas.min.js"></script>
<script src="../../../resource/Moment/moment.js"></script>
<script src="../../../resource/Moment/moment-with-locales.js"></script>
<script src="../../../resource/dist/js/style.js"></script>
<script type="text/javascript">
    datos = (<?php echo $_POST["datos"]; ?>)
</script>
<?php
//$datos = json_decode($_POST["datos"], TRUE);
?>


<section class="content-header">
    <h1>
        Vista Impresión<small>Proforma</small>
    </h1>
    <hr class="style8">
</section>
<section class="content container-fluid ">
    <div class="col-md-12">
        <div class="pull-right ">
            <div class="btn-group">
                <button class="btn btn-success btn-sm"><i class="fa fa-print"></i> Imprimir</button>
                <button id="btnGenerarIMG" class="btn btn-info btn-sm"><i class="fa fa-image"></i> Imagen</button>
            </div>
            <a href="#" dw class="btn-primary btn-sm hidden"><i class="fa fa-download"></i> Download</a>
        </div>

    </div>
    <div class="col-md-12">
        <div id="proforma" style="width: 70%; margin: 0 auto;" class="">
            <div name="header">
                <div class="col-md-2" >
                    <img src="../../../resource/ConfigIMG/logo.png" style="float: right;" width="130" alt="">
                </div>
                <div class="col-md-9">
                    <h2 class="text-center bold">BrauPeComp Tecnologies</h2>
                    <h4 class="text-center bold">REPARACION Y VENTAS DE COMPUTADORAS</h4>
                    <h5 class="text-center bold">PÉREZ SALDAÑA BRAULIO DOUGLAS</h5>
                    <h5 class="text-center">Venta al por mayor y menor de computadoras, partes y piezas</h5>
                </div>

            </div>
            <div name="encabezado">
                <table style="width: 100%;">
                    <tbody>
                        <tr>
                            <td class="thCabezera">RUC:</td>
                            <td></td>
                            <td class="thCabezera">CEL:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">DIRECCIÓN:</td>
                            <td></td>
                            <td class="thCabezera">E-MAIL:</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div name="detail" >
                <table border='1' style="width: 100%;">
                    <tbody>
                        <tr>
                            <td class="thCabezera" >CLIENTE:</td>
                            <td name='cliente'></td>
                            <td class="thCabezera">PROFORMA N°:</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">C.I O RUC:</td>
                            <td name='cliente_ruc'></td>
                            <td class="thCabezera" >FECHA</td>
                            <td name='fecha'></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">TELÉFONO:</td>
                            <td name='cliente_telefono'></td>
                            <td class="thCabezera">VALIDEZ</td>
                            <td> 7 dias o Ago/Stock</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <table id="detalle"  >
                    <thead>
                        <tr>
                            <th data-field="cantidad" class="col-md-1" data-align='center'>Cantidad</th>
                            <th data-field="producto">Producto</th>
                            <th data-field="precioUnit" class="col-md-2" data-align='center'>Precio Unit.</th>
                            <th data-field="precioTotal" class="col-md-2" data-align='center'>Precio Total</th>
                        </tr>
                    </thead>
                </table>
                <br>
                <div class="pull-left">
                    <div class="form-inline" style="margin-bottom: 2px;" >
                        <label for="" class="control-label">IVA 12%:</label>
                        <input name='iva' type="text" class="form-control text-right" readonly>
                    </div>
                </div>
                <div class="form-inline" style="margin-bottom: 2px;" >
                    <label for="" class="control-label">Sub-Total:</label>
                    <input name='subtotal' type="text" class="form-control text-right" readonly>
                </div>
                <div class="form-inline" style="margin-bottom: 2px;" >
                    <label for="" class="control-label">IVA 12%:</label>
                    <input name='iva' type="text" class="form-control text-right" readonly>
                </div>
                <div class="form-inline" >
                    <label for="" class="control-label">Total:</label>
                    <input name='total' type="text" class="form-control text-right" readonly>
                </div>
                <!--                <div class="pull-right" style="display:flex; flex-direction: column; align-items: flex-end;">
                                    <div class="form-inline" style="margin-bottom: 2px;" >
                                        <label for="" class="control-label">Sub-Total:</label>
                                        <input name='subtotal' type="text" class="form-control text-right" readonly>
                                    </div>
                                    <div class="form-inline" style="margin-bottom: 2px;" >
                                        <label for="" class="control-label">IVA 12%:</label>
                                        <input name='iva' type="text" class="form-control text-right" readonly>
                                    </div>
                                    <div class="form-inline" >
                                        <label for="" class="control-label">Total:</label>
                                        <input name='total' type="text" class="form-control text-right" readonly>
                                    </div>
                                </div>-->
            </div>
            <div name="footer"></div>
        </div>
    </div>
</section>
<script type="text/javascript" src="../../../resource/View/Proform/fileProforma.js"></script>