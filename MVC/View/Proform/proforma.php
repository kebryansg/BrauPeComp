<!DOCTYPE html>
<section class="content-header">
    <h1>
        Proforma
    </h1>
    <hr class="style8">
</section>
<section class="content container-fluid">
    <div Listado>
        <div id="toolbar" class="btn-group">
            <button type="button" name="btn_add" class="btn btn-success">
                <i class="glyphicon glyphicon-plus"></i> Agregar
            </button>
            <button type="button" name="btn_del" class="btn btn-danger">
                <i class="glyphicon glyphicon-trash"></i> Eliminar
            </button>
        </div>
        <table
            init
            data-toolbar="#toolbar"
            data-ajax="loadProducto"
            data-response-handler="responseHandler"
            >
            <thead>
                <tr>
                    <th data-field="state" data-checkbox="true"></th>
                    <th data-field="id" class="col-md-1">N° Proforma</th>
                    <th data-field="fecha" class="col-md-3">Fecha</th>
                    <th data-field="tipoGanancia" class="col-md-2">Tipo Ganancia</th>
                    <th data-field="observacion">Observacion</th>
                    <th data-field="accion" class="col-md-1" data-align="center" data-formatter="defaultBtnAccion" >Acción</th>
                </tr>
            </thead>
        </table>
    </div>
    <div Registro class="hidden">
        <form save action="servidor/sProforma.php" role="proforma">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="" class="control-label">N° Proforma</label>
                        <input name="id" type="text" class="form-control" readonly value="0">
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label">Fecha</label>
                        <input name="fecha" type="text" class="form-control" readonly>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label for="" class="control-label">Tipo de Comisión</label>
                        <select name="estado" class="form-control" required>
                            <option value="GEN">Por Total</option>
                            <option value="PROD">Por Producto</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="" class="control-label">Valor Comisión</label>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="pull-right">
                                    <button type="button" class="btn btn-success"><i class="fa fa-refresh"></i></button>
                                </div>
                                <input name="comision" type="text" class="form-control" required data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false,  'placeholder': '0'" style="text-align: right;width: 80%;">
                                
                            </div>

                        </div>

                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="" class="control-label">Cliente</label>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="pull-right">
                                    <button type="button" data-toggle="modal" data-target="#modal-find-cliente" class="btn btn-primary"><i class="fa fa-search"></i> </button>
                                    <button type="button" class="btn btn-success"><i class="fa fa-plus"></i> </button>
                                </div>
                                <input type="text" nombres class="form-control" style="width: 70%;" readonly>
                                <input type="text" class="hidden" name="cliente">
                                
                            </div>
                        </div>
                        
                    </div>
                    <!--<div class="form-group">
                        <label for="" class="control-label">Observación</label>
                        <textarea class="form-control" name="observacion" cols="30" rows="4"></textarea>
                    </div>-->
                </div>
            </div>
            <div class="row">
                <div toolbar id="toolbarDetalle" class="btn-group">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#modal-new" data-tab="#detalleProforma">
                        <i class="fa fa-plus"></i> Agregar
                    </button>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-find">
                        <i class="fa fa-search"></i> Producto
                    </button>
                    <button type="button" name="btn_del_individual" class="btn btn-danger">
                        <i class="fa fa-trash"></i> Eliminar
                    </button>
                </div>
                <div class="col-md-12">
                    <table 
                        id="detalleProforma"
                        data-toolbar="#toolbarDetalle"
                        detalle>
                        <thead>
                            <tr>
                                <th data-field="state" data-checkbox="true"></th>
                                <th data-field="producto" >Producto</th>
                                <th data-field="cantidad" class="col-md-2" >Cantidad</th>
                                <th data-field="precioProveedor" class="col-md-2"  >$ Proveedor</th>
                                <th data-field="precioComision" class="col-md-2" >$ Comisión</th>
                                <th data-field="accion" class="col-md-1" data-align="center" data-formatter="defaultAccion" data-events="editAccion" >Accion</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <button type="reset" class="btn btn-danger">
                            <i class="fa fa-reply"></i> Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fa fa-save"></i> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div id="modal-new" class="modal fade"   >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        Nuevo Items
                    </h4>
                </div>
                <div class="modal-body">
                    <form local data-tb="#detalleProforma" action="action">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="control-label">Producto</label>
                                    <input name="producto" type="text" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label for="" class="control-label">Cantidad</label>
                                    <input name="cantidad" type="text" class="form-control" required data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false,  'placeholder': '0'" style="text-align: right;" >
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="control-label">$ Proveedor</label>
                                    <input name="precioProveedor" type="text" class="form-control" required data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false,  'placeholder': '0'" style="text-align: right;">
                                </div>
                                <div class="form-group">
                                    <label for="" class="control-label">$ Comisión</label>
                                    <input name="precioComision" type="text" class="form-control" required data-inputmask="'alias': 'numeric', 'groupSeparator': ',', 'autoGroup': true, 'digits': 2, 'digitsOptional': false, 'placeholder': '0'" style="text-align: right;">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="pull-right">
                                    <button type="reset" class="btn btn-danger"> <i class="fa fa-reply"></i> Cancelar</button>
                                    <button type="submit" class="btn btn-primary"> <i class="fa fa-plus"></i> Añadir </button>
                                </div>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
    
    <div id="modal-find" class="modal fade"   >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        Buscar Items
                    </h4>
                </div>
                <div class="modal-body">
                    <table
                        find
                        data-ajax="loadProducto"
                        >
                        <thead>
                            <tr>
                                <th data-field="descripcion">Descripcion</th>
                                <th data-formatter="AccSeleccion" data-events="event_find" class="col-md-1" data-align="center">Acción</th>
                            </tr>
                        </thead>
                    </table>


                </div>
            </div>
        </div>
    </div>
    <div id="modal-find-cliente" class="modal fade"   >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        Buscar Cliente
                    </h4>
                </div>
                <div class="modal-body">
                    <table
                        find
                        data-ajax="loadCliente"
                        >
                        <thead>
                            <tr>
                                <th data-field="nombres">Nombre</th>
                                <th data-field="identificacion">Identificación</th>
                                <th data-field="telefono">Teléfono</th>
                                <th data-formatter="AccSeleccion" data-events="event_find_cliente" class="col-md-1" data-align="center">Acción</th>
                            </tr>
                        </thead>
                    </table>


                </div>
            </div>
        </div>
    </div>

</section>

<script src="resource/View/Proform/proforma.js" type="text/javascript"></script>