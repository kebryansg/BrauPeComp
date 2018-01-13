table = $("div[Listado] table");
function initRegistro() {
    $("input[fecha]").val(moment().format('MMMM D, YYYY'));

    $("input[myDecimal]").val("0");

    $("input[myDecimal]").inputmask("myDecimal");


    $("input[nombres]").val("Consumidor Final");
    $("input[name='cliente']").val(1);

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
            calculoTb();
        }
        $("#modal-find").modal("hide");
    }
};
window.event_find_cliente = {
    'click button[select]': function (e, value, row, index) {
        $("input[nombres]").val(row.nombres);
        $("input[name='cliente']").val(row.id);
        $("#modal-find-cliente").modal("hide");

    }
};
window.editAccion = {
    'click button[edit]': function (e, value, row, index) {
        editDetalle(row, index);
    }
};

$(function () {
    $("table[init]").bootstrapTable(TablePaginationDefault);

    $("table[find]").bootstrapTable($.extend({}, TablePaginationDefault, {
        height: 400,
        showRefresh: true,
        searchTimeOut: 250
    }));


    $("input[data-inputmask]").inputmask();


    $("table[detalle]").bootstrapTable({
        cache: false,
        height: 300
    });

    $(document).on("reset", "form[local]", function (e) {
        $(this).removeData("index");
        $(this).removeData("id");
        $("#modal-new").modal("hide");
    });

    $("#modal-find,#modal-find-cliente").on({
        'shown.bs.modal': function (e) {
            $(this).find("table[find]").bootstrapTable("resetSearch", "");
        }
    });

    $("#modal-new").on({
        'hidden.bs.modal': function (e) {
            $("#modal-new form[local]").trigger("reset");
        }
    });

    $("form[local]").submit(function (e) {
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
        }
        calculoTb();
        $(this).trigger("reset");
    });


    $("input[name='ganancia']").change(function (e) {
        before_comision = parseFloat($("#txtComision").val());
        comision = parseFloat($(this).val());
        total = before_comision + comision;
        $("#txtComision").val(total.toFixed(2));
    });

//    $("button[name='btn_add']").click();
});



function getDatos(form) {
    form_datos = JSON.parse($(form).serializeObject());
    fecha = moment($("input[name='fecha']").val(), 'MMMM D, YYYY');
    form_datos["fecha"] = fecha.format("YYYY-MM-DD HH:mm:ss");
    datos = {
        url: $(form).attr("action"),
        dt: {
            accion: "save",
            op: $(form).attr("role"),
            datos: JSON.stringify(form_datos),
            detalles: JSON.stringify($("#detalleProforma").bootstrapTable("getData"))
        }
    };
    console.log(datos);
    return datos;
}

function calculoTb() {
    subtotal = 0;

    console.log($("#detalleProforma").bootstrapTable("getData"));
    $.each($("#detalleProforma").bootstrapTable("getData"), function (i, row) {
        subtotal += row.cantidad * row.precioProveedor;
    });
    $("#txtSubtotal").val(subtotal.toFixed(2));
    /* Comision */
    comision = 0;
    $.each($("#detalleProforma").bootstrapTable("getData"), function (i, row) {
        comision += parseFloat(row.precioComision);
    });
    $("#txtComision").val(comision.toFixed(2));

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

function edit(datos) {
    form = "div[Registro] form";
    console.log(datos);
    $(form).data("id", datos.id);
    for (var clave in datos) {
        $(form + " [name='" + clave + "']").val(datos[clave]);
    }

    $.post("servidor/sProforma.php",
            {
                accion: "list",
                op: "DetallePorforma",
                idProforma: datos.id
            },
            function (response) {
                //$("#detalleProforma").bootstrapTable("load", JSON.parse(response));
                $("#detalleProforma").bootstrapTable("load", response);
            }, "json");

    $.post("servidor/sCliente.php", {
        accion: "get",
        op: "",
        idCliente: datos.cliente
    }, function (response) {
        response = JSON.parse(response);
        $(form + " [name='cliente']").val(response.id);
        $(form + " input[nombres]").val(response.nombres);
        //console.log(response);
    });
    calculoTb();

}