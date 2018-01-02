<!DOCTYPE html>
<link href="resource/file_input/fileinput.min.css" rel="stylesheet" />


<section class="content-header">
    <h1>
        Configuración
    </h1>
    <hr class="style8">
</section>

<section class="content container-fluid">

    <ul class="nav nav-tabs">
        <li class="active" ><a data-toggle="tab" href="#menu1">Información</a></li>
        <li><a data-toggle="tab" href="#menu2">Logotipo</a></li>
    </ul>

    <div class="tab-content">
        <div id="menu1" class="tab-pane fade in active">
            <br>
            <form save action="servidor/sConfigure.php" role="configuracion" enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="" class="control-label">Nombre Comercial</label>
                            <input type="text" class="form-control" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label for="" class="control-label">RUC</label>
                            <input type="text" class="form-control" name="ruc" required>
                        </div>
                        <div class="row">
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label for="" class="control-label">Celular</label>
                                    <input type="text" class="form-control" name="celular" maxlength="10" required>
                                </div>
                            </div>
                            <div class="col-xs-6">
                                <div class="form-group">
                                    <label for="" class="control-label">Teléfono</label>
                                    <input type="text" class="form-control" name="telefono" maxlength="10" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="" class="control-label">Email</label>
                            <input type="email" name="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="" class="control-label">Dirección</label>
                            <textarea name="direccion" cols="30" rows="4" class="form-control" required></textarea>
                        </div>

                    </div>
                    <div class="clearfix"></div>
                    <div class="col-md-12">
                        <div class="pull-left">
                            <button id="btnRefrescar" type="button" class="btn btn-success" title="Refrescar Información">
                                <i class="fa fa-refresh"></i>
                            </button>
                        </div>
                        <div class="pull-right">
                            <button type="reset" class="btn btn-danger">
                                <i class="fa fa-reply"></i>  Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fa fa-save"></i>  Guardar
                            </button>
                        </div>
                    </div>
                </div>
                
                <input id="imagen2" name="imagen" type="file">

            </form>
        </div>
        <div id="menu2" class="tab-pane fade">
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="file-loading">
                        <input id="imagen" name="imagen" type="file">
                    </div>
                </div>

            </div>
        </div>
    </div>





</section>

<script src="resource/file_input/fileinput.min.js" type="text/javascript"></script>
<script src="resource/file_input/locales/es.js" type="text/javascript"></script>
<script src="resource/View/Configure/configure.js" type="text/javascript"></script>
<script>

    /*$("#btnGenerarFormato").click(function () {
     url = "servidor/sExcel.php?op=formato";
     window.open(url, '_blank');
     });*/

    $("#imagen").fileinput({
        uploadUrl: "servidor/sConfigure.php",
        language: 'es',
        uploadExtraData: {
            accion: "save",
            op: "updateLogo"
        },
        allowedFileExtensions: ['png', 'jpg']

    });
</script>
