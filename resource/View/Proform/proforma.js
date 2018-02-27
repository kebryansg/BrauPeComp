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
            $("#detalleProforma").bootstrapTable("scrollTo", "bottom");
            total = $("#detalleProforma").bootstrapTable("getData").length;
            total = total === 0 ? total : total - 1;
            $("#contadorRegistro").html("Registros: " + total);
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

    /*var unformattedDate = Inputmask.format("12222.00", "myDecimal");
     console.log("aqui");
     console.log(unformattedDate);*/

    $("button[delete_local]").click(function (e) {
        div_id = $(this).closest("div[toolbar]").attr("id");
        tableSelect = $("table[data-toolbar='#" + div_id + "']");

        // Retornar Ids diferentes a 0
        ids = $(tableSelect).bootstrapTable("getSelections").filter(row => parseInt(row.id) !== 0);
        id_delete = $.map($(ids), function (row) {
            return row.id;
        });


        if ($.isEmptyObject($(this).data("ids"))) {
            $(this).data("ids", id_delete);
        } else {
            _new = $.merge($(this).data("ids"), id_delete);
            console.log(_new);
        }

        state = $(tableSelect).bootstrapTable("getSelections").map(row => row.state);
        $(tableSelect).bootstrapTable("remove", {field: 'state', values: state});

        total = $("#detalleProforma").bootstrapTable("getData").length;
        total = total === 0 ? total : total - 1;
        $("#contadorRegistro").html("Registros: " + total);

    });

    /*$(document).on("click", "input[myDecimal]", function () {
     //$(this).focus();
     $(this).select();
     });
     
     $(document).on("focus", "input[myDecimal]", function () {
     $(this).inputmask("myDecimal");
     });*/

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

//    $("#detalleProforma").on('reorder-row.bs.table', function (e, data) {
//        console.log(data);
//        //$("#detalleProforma").bootstrapTable("refresh");
//    });

    $("table[init]").bootstrapTable(TablePaginationDefault);

    $("table[find]").bootstrapTable($.extend({}, TablePaginationDefault, {
        height: 400,
        showRefresh: true,
        searchTimeOut: 250
    }));

    $("table[detalle]").bootstrapTable({
        cache: false,
        height: 450
    });

    $("#modal-find,#modal-find-cliente").on({
        'shown.bs.modal': function (e) {
            $(this).find("table[find]").bootstrapTable("resetSearch", "");
        }
    });

    $("#modal-view-detalle").on({
        'shown.bs.modal': function (e) {
            $(this).find("table").bootstrapTable("resetView");
        }
    });

    $("button[addTable]").click(function (e) {
        $("#detalleProforma").bootstrapTable("append", {
            idProducto: 0,
            producto: "",
            cantidad: 1,
            precioProveedor: 0,
            precioComision: 0
        });
        $("#detalleProforma").bootstrapTable("scrollTo", "bottom");

        total = $("#detalleProforma").bootstrapTable("getData").length;
        total = total === 0 ? total : total - 1;
        $("#contadorRegistro").html("Registros: " + total);

    });

    $("#ActualizarValores").click(function (e) {
        //$("form[save]").serializeObject_KBSG();

        calculoTb();
    });

});

function getDatos(form) {
//    form_datos = JSON.parse($(form).serializeObject_KBSG());
    //form_datos = JSON.parse($(form).serializeObject());
    //form_datos.fecha = formatSave(form_datos.fecha);
    datos = {
        url: $(form).attr("action"),
        dt: {
            accion: "save",
            op: $(form).attr("role"),
            datos: $(form).serializeObject_KBSG(), //JSON.stringify(form_datos),
            detalles: JSON.stringify($("#detalleProforma").bootstrapTable("getData")),
            detalles_delete: JSON.stringify($("button[delete_local]").data("ids"))
        }
    };
    $("button[delete_local]").removeData("ids");
    $("#detalleProforma").bootstrapTable("removeAll");
    return datos;
}

function calculoTb() {
    subtotal = 0;
    comision = 0;
    ganancia = $("input[name='ganancia']").getFloat();

    $.each($("#detalleProforma").bootstrapTable("getData"), function (i, row) {
        subtotal += convertFloat(row.cantidad) * convertFloat(row.precioProveedor);
        comision += convertFloat(row.precioComision);
    });


    $("#txtSubtotal").val(formatInputMask(subtotal));
    comision += ganancia;
    $("#txtComision").val(formatInputMask(comision));
    subtotal = (subtotal + (comision / 1.12));
    total = subtotal + (subtotal * 0.12);
    $("#txtTotal").val(formatInputMask(total));

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
    response_format = $.map(response, function (row) {
        return {
            //id: 0,
            cantidad: row.cantidad,
            producto: row.producto,
            precioProveedor: row.precioProveedor,
            precioComision: row.precioComision,
            IdProducto: row.idproducto
        };
    });
    $("#detalleProforma").bootstrapTable("load", response_format);
    total = (response_format.length === 0) ? response_format.length : response_format.length - 1;
    $("#contadorRegistro").html("Registros: " + total);

    calculoTb();
}

function edit(datos) {
    console.log(datos);
    form = "div[Registro] form";
    $(form).data("id", datos.id);
    for (var clave in datos) {
        $(form + " [name='" + clave + "']").val(datos[clave]);
    }
    $(form + " [name='fecha']").val(formatView(datos["fecha"]));

    response_tb = getJson({
        url: "servidor/sProforma.php",
        data: {
            accion: "list",
            op: "DetallePorforma",
            idProforma: datos.id
        }
    });


    setTimeout(function () {
        $("#detalleProforma").bootstrapTable("load", response_tb);
        total = (response_tb.length === 0) ? response_tb.length : response_tb.length - 1;
        $("#contadorRegistro").html("Registros: " + total);
        calculoTb();
    }, 300);

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

    $("button[delete_local]").removeData("ids");


}

function BtnAccion(value, rowData, index) {
    return '<div class="btn-group" name="shows">' +
            '<button name="view" class="btn btn-default btn-sm"><i class="fa fa-eye"></i> </button>' +
            '<button type="button" class="btn btn-default dropdown-toggle btn-sm"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            ' <i class="fa fa-fw fa-align-justify"></i>' +
            '</button>' +
            '<ul class="dropdown-menu dropdown-menu-left" >' +
            '<li name="edit"><a href="#"> <i class="fa fa-edit"></i> Editar</a></li>' +
            //' <li name="view" ><a href="#"> <i class="fa fa-tasks"></i> Vista Previa</a></li>' +
            ' <li name="duplicate" ><a href="#"> <i class="fa fa-copy"></i> Duplicar</a></li>' +
            ' <li name="download" ><a href="#"> <i class="fa fa-download"></i> Export</a></li>' +
            ' <li name="download-completo" ><a href="#"> <i class="fa fa-download"></i> Export(Detalle Completo)</a></li>' +
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
    return '<input myDecimal field="' + this.field + '" type="text" class="form-control input-sm" value="' + formatInputMask(value) + '">';
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
        table = $(this).closest("table");
        tr_index = $(this).closest("tr").attr("data-index");
        row_data = $(table).bootstrapTable("getData")[tr_index];
        row_data.producto = $(e.target).val();

        $(table).bootstrapTable('updateRow', {
            index: tr_index,
            row: row_data
        });
    },
    'change input[myDecimal]': function (e, value, row, index) {
        table = $(this).closest("table");
        //valor =  $(e.target).val(); // convert Float 
        valor = $(e.target).getFloat(); // convert Float 
        tr_index = $(this).closest("tr").attr("data-index");
        row_data = $(table).bootstrapTable("getData")[tr_index];
        row_data[$(e.target).attr("field")] = valor;

        $(table).bootstrapTable('updateRow', {
            index: tr_index,
            row: row_data
        });
    },
    'focus input[myDecimal]': function (e, value, row, index) {
        $(this).inputmask("myDecimal");
        $(this).select();
    }
};
function rowCount(value, row, index) {
    return (index === 0) ? "" : index;
}