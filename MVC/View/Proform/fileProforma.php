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
    datos = (<?php echo $_POST["datos"]; ?>);
</script>


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
        <div id="proforma" style="width: 70%; margin: 0 auto; padding: 0 30px;">
            <div name="header">
                <div class="col-md-2" >
                    <img src="../../../resource/ConfigIMG/logo.png" style="float: right;" width="130" alt="">
                </div>
                <div class="col-md-9">
                    <h2 class="text-center bold" style="color: red;" name="insitucacion" >BrauPeComp Tecnologies</h2>
                    <h4 class="text-center bold">REPARACION Y VENTAS DE COMPUTADORAS</h4>
                    <h5 class="text-center bold">PÉREZ SALDAÑA BRAULIO DOUGLAS</h5>
                    <h5 class="text-center">Venta al por mayor y menor de computadoras, partes y piezas</h5>
                </div>

            </div>
            <div name="encabezado">
                <table style="width: 100%;">
                    <tbody>
                        <tr >
                            <td class="thCabezera">RUC:</td>
                            <td name="ruc"></td>
                            <td class="thCabezera">CEL:</td>
                            <td name="celular"></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">DIRECCIÓN:</td>
                            <td name="direccion"></td>
                            <td class="thCabezera">E-MAIL:</td>
                            <td name="email"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div name="detail" >
                <table border='1' style="width: 100%;">
                    <tbody>
                        <tr>
                            <td class="thCabezera" >CLIENTE:</td>
                            <td name='cliente' class="thDatos"></td>
                            <td class="thCabezera">PROFORMA N°:</td>
                            <td name='codigo' class="thDatos"></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">C.I O RUC:</td>
                            <td name='cliente_ruc' class="thDatos"></td>
                            <td class="thCabezera" >FECHA</td>
                            <td name='fecha' class="thDatos"></td>
                        </tr>
                        <tr>
                            <td class="thCabezera">TELÉFONO:</td>
                            <td name='cliente_telefono' class="thDatos"></td>
                            <td class="thCabezera">VALIDEZ</td>
                            <td class="thDatos"> 7 dias o Ago/Stock</td>
                        </tr>
                    </tbody>
                </table>
                <br>
                <!--<table id="detalle"  >
                    <thead>
                        <tr>
                            <th data-field="cantidad" class="col-md-1" data-align='center'>Cantidad</th>
                            <th data-field="producto">Producto</th>
                            <th data-field="precioUnit" class="col-md-2" data-align='center'>Precio Unit.</th>
                            <th data-field="precioTotal" class="col-md-2" data-align='center'>Precio Total</th>
                        </tr>
                    </thead>
                </table>
                <br>-->
                <table detalle class="table table-bordered" >
                    <thead style = "color:white; background-color:graytext;">
                        <tr >
                            <th data-field="cantidad" class="col-md-1" data-align='center'>Cantidad</th>
                            <th data-field="producto" data-formatter="styleProducto">Producto</th>
                            <th data-field="precioUnit" class="col-md-2" data-align='center'>Precio Unit.</th>
                            <th data-field="precioTotal" class="col-md-2" data-align='center'>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody> </tbody>
                </table>
                <br>
                <div style="width: 100%; display: flex; flex-direction: row; justify-content: space-between;">
                    <div id="notas" class="col-md-7">
<!--                        <p class="text-justify">
                            <strong>Garantia</strong> 
                        </p>-->
                        <dl >
                            <dt>Garantia:</dt>
                            <dd class="text-justify" name="garantia">
                                ANTE DEFECTOS DE FABRICACIÓN: 3 Años en Monitor, mainboard y procesador.
                                1 año en resto de componentes y partes.</dd>
                            <br>
                            <dt>Nota:</dt>
                            <dd class="text-justify">
                                El precio puede varias dependiendo las partes que el cliente quiera cambiar.
                                Confirmar la compra a mi telefono 0997890738, para el pago, puede depositar a mi cuenta de ahorros Banco Pichincha a nombre de Braulio Pérez Saldaña #2201316607
                            </dd>
                            <br>
                            <dt>Depositar $<strong name="envio">0.00</strong> adicional del envío por servientrega.</dt>
                            <!--<dd class="text-justify">
                                El precio puede varias dependiendo las partes que el cliente quiera cambiar.
                                Confirmar la compra a mi telefono 099, para el pago, puede depositar a mi cuenta de ahorros Banco Pichincha a nombre de Braulio Pérez Saldaña #2201316607
                            </dd>-->
                        </dl>
                    </div>
                    <div style="display:flex; flex-direction: column; align-items: flex-end;" >
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
                    </div>
                </div>
            </div>
            <div name="footer" style="text-align: center;padding-bottom: 20px;">
                <h5 class="text-center bold">Atentamente</h5>
                <h5 class="text-center">Ing. Braulio Pérez Saldaña</h5>
                <h5 class="text-center">Reparación, ventas y soluciones técnicas.</h5>
            </div>
        </div>
    </div>
</section>
<script type="text/javascript" src="../../../resource/View/Proform/fileProforma.js"></script>