table = $("div[Listado] table");
function initRegistro() {
    $("input[fecha]").val(formatView(moment()));

    $("input[myDecimal]").val("0");
    $("input[myDecimal]").inputmask("myDecimal");


    $("input[nombres]").val("Consumidor Final");
    $("input[name='IdCliente']").val(1);

}

window.event_find = {
    'click button[select]': function (e, value, row, index) {
        datos = [];
        idProductos = $("#detalleProforma").bootstrapTable("getData").map(function (rw) {
            return rw.idProducto;
        });
        if ($.inArray(row.id, idProductos) < 0) {
            $("#detalleProforma").bootstrapTable("append", {
                idProducto: row.id,
                producto: row.descripcion,
                cantidad: 1,
                precioProveedor: 0,
                precioComision: 0
            });
            //calculoTb();
        }
        $("#modal-find").modal("hide");
    }
};
window.event_find_cliente = {
    'click button[select]': function (e, value, row, index) {
        $("input[nombres]").val(row.nombres);
        $("input[name='IdCliente']").val(row.id);
        $("#modal-find-cliente").modal("hide");

    }
};
window.editAccion = {
    'click button[edit]': function (e, value, row, index) {
        editDetalle(row, index);
    }
};

$(function () {

    $(document).on("focus", "input[myDecimal]", function () {
        $(this).inputmask("myDecimal");
    });

    $('#modal-new2').on({
        'show.bs.modal': function (e) {
//console.log($(e.relatedTarget).closest(".input-group"));
            dataUrl = $(e.relatedTarget).attr("data-url");
            modal = $(e.relatedTarget).attr("data-target");
            html = initModalNew(dataUrl);
            $(modal + ' .modal-body').html(html);
        },
        'hidden.bs.modal': function (e) {
            // Para que el refesh sea automatico
        }
    });

    //$("button[name='btn_add']").click();
    $("table[init]").bootstrapTable(TablePaginationDefault);

    $("table[find]").bootstrapTable($.extend({}, TablePaginationDefault, {
        height: 400,
        showRefresh: true,
        searchTimeOut: 250
    }));

    $("table[detalle]").bootstrapTable({
        cache: false,
        height: 300
    });

    /*$(document).on("reset", "form[local]", function (e) {
        $(this).removeData("index");
        $(this).removeData("id");
        $("#modal-new").modal("hide");
    });*/

    $("#modal-find,#modal-find-cliente").on({
        'shown.bs.modal': function (e) {
            $(this).find("table[find]").bootstrapTable("resetSearch", "");
        }
    });

    /*$("#modal-new").on({
     'show.bs.modal': function (e) {
     //$("#modal-new input[myDecimal]").val(0);
     },
     'hidden.bs.modal': function (e) {
     $("#modal-new form[local]").trigger("reset");
     //$("#modal-new input[myDecimal]").inputmask('remove');
     //$("#modal-new input[myDecimal]").inputmask("myDecimal");
     }
     });*/

    /*$("form[local]").submit(function (e) {
     e.preventDefault();
     tb = $(this).attr("data-tb");
     datos = JSON.parse($(this).serializeObject());
     
     if ($.isNumeric($(this).data("index"))) {
     $(tb).bootstrapTable("updateRow", {
     index: $(this).data("index"),
     row: datos
     });
     } else {
     datos["idProducto"] = "0";
     $(tb).bootstrapTable("append", datos);
     //$(tb).bootstrapTable("insertRow",{index: 0,row: datos});
     }
     calculoTb();
     $(this).trigger("reset");
     });*/



    $("button[addTable]").click(function (e) {
        $("#detalleProforma").bootstrapTable("append", {
            idProducto: 0,
            producto: "",
            cantidad: 1,
            precioProveedor: 0,
            precioComision: 0
        });
    });

    $("#ActualizarValores").click(function (e) {
        calculoTb();
    });

});



function getDatos(form) {
    form_datos = JSON.parse($(form).serializeObject());

    fecha = $("input[name='fecha']").val();
    form_datos["fecha"] = formatSave(fecha);
    datos = {
        url: $(form).attr("action"),
        dt: {
            accion: "save",
            op: $(form).attr("role"),
            datos: JSON.stringify(form_datos),
            detalles: JSON.stringify($("#detalleProforma").bootstrapTable("getData"))
        }
    };
    //console.log(datos);
    return datos;
}

function calculoTb() {
    subtotal = 0;
    comision = 0;
    ganancia = parseFloat($("input[name='ganancia']").val());

    $.each($("#detalleProforma").bootstrapTable("getData"), function (i, row) {
        subtotal += row.cantidad * row.precioProveedor;
        comision += parseFloat(row.precioComision);
    });


    $("#txtSubtotal").val(subtotal.toFixed(2));
    comision += ganancia;
    $("#txtComision").val(comision.toFixed(2));
    subtotal = (subtotal + (comision / 1.12));
    total = subtotal + (subtotal * 0.12);
    $("#txtTotal").val(total.toFixed(2));

}

function editDetalle(datos, index) {
    $("form[local]").data("index", index);
    $("form[local]").data("id", datos.id);
    for (var clave in datos) {
        $("form[local] [name='" + clave + "']").val(datos[clave]);
    }
}

function defaultAccion() {
    return '<button edit   data-toggle="modal" data-target="#modal-new" type="button" class="btn btn-sm btn-info"> <i class="fa fa-edit"></i> </button>';
}

function AccSeleccion() {
    return '<button select type="button" class="btn btn-sm btn-info"> <i class="fa fa-check"></i> Seleccionar </button>';
}

function duplicate(datos) {
    $("button[name='btn_add']").click();
    response = getJson({
        url: "servidor/sProforma.php",
        data: {
            accion: "list",
            op: "DetallePorforma",
            idProforma: datos.id
        }
    });
    $("#detalleProforma").bootstrapTable("load", response);
    calculoTb();
}

function edit(datos) {
    form = "div[Registro] form";
    //console.log(datos);

    //datos["fecha"] = formatView(datos["fecha"]);

    $(form).data("id", datos.id);
    for (var clave in datos) {
        $(form + " [name='" + clave + "']").val(datos[clave]);
    }
    $(form + " [name='fecha']").val(formatView(datos["fecha"]));



    response = getJson({
        url: "servidor/sProforma.php",
        data: {
            accion: "list",
            op: "DetallePorforma",
            idProforma: datos.id
        }
    });
    $("#detalleProforma").bootstrapTable("load", response);

    response = getJson({
        url: "servidor/sCliente.php",
        data: {
            accion: "get",
            op: "",
            idCliente: datos.idcliente
        }
    });
    $(form + " [name='IdCliente']").val(response.id);
    $(form + " input[nombres]").val(response.nombres);

    $("input[myDecimal]").inputmask("myDecimal");




    calculoTb();

}

function BtnAccion(value, rowData, index) {
    return '<div class="btn-group" name="shows">' +
            '<button type="button" class="btn btn-default dropdown-toggle btn-sm"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            ' <i class="fa fa-fw fa-align-justify"></i>' +
            '</button>' +
            '<ul class="dropdown-menu dropdown-menu-left" >' +
            '<li name="edit"><a href="#"> <i class="fa fa-edit"></i> Editar</a></li>' +
            ' <li name="view" ><a href="#"> <i class="fa fa-tasks"></i> Vista Previa</a></li>' +
            ' <li name="duplicate" ><a href="#"> <i class="fa fa-copy"></i> Duplicar</a></li>' +
            ' <li name="download" ><a href="#"> <i class="fa fa-download"></i> Export</a></li>' +
            '</ul>' +
            '</div>';
}

function viewDetalle(datos) {
    response = getJson({
        url: "servidor/sProforma.php",
        data: {
            accion: "list",
            op: "DetallePorforma",
            idProforma: datos.id
        }
    });
    $("#modal-view-detalle table").bootstrapTable("load", response);
    $("#modal-view-detalle").modal("show");
}

function imask(value, rowData, index) {
    return '<input myDecimal field="' + this.field + '" type="text" class="form-control input-sm" value="' + parseFloat(value).toFixed(2) + '">';
}
function defaultDescripcion(value, rowData, index) {
    if (rowData.idProducto === 0) {
        return '<input descripcion class="form-control input-sm" type="text" value="' + value + '">';
    } else {
        return value;
    }
}

window.event_imask = {
    'change input[descripcion]': function (e, value, row, index) {
        row.producto = $(e.target).val();
        table = $(this).closest("table");
        $(table).bootstrapTable('updateRow', {
            index: index,
            row: row
        });
    },
    'change input[myDecimal]': function (e, value, row, index) {
        cantidad = parseFloat($(e.target).val());
        val = value;
        console.log(value);
        row[$(e.target).attr("field")] = cantidad;
        table = $(this).closest("table");
        $(table).bootstrapTable('updateRow', {
            index: index,
            row: row
        });
    }
};