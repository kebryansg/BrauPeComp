window.event_find = {
    'click button[select]': function (e, value, row, index) {
        datos = [];
        ids = $("#detalleProforma").bootstrapTable("getData").map(function (rw) {
            return rw.id;
        });
        if ($.inArray(row.id, ids) < 0) {
            $("#detalleProforma").bootstrapTable("append", {
                id: row.id,
                producto: row.descripcion,
                cantidad: 1,
                precioProveedor: 0,
                precioComision: 0
            });
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
        edit(row, index);
    }
};
$(function () {
    $("table[init]").bootstrapTable(TablePaginationDefault);
    $("table[find]").bootstrapTable($.extend({}, TablePaginationDefault, {
        height: 300
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

    $("#modal-new").on({
        'hidden.bs.modal': function (e) {
            $("#modal-new form[local]").trigger("reset");
        }
    });

    $("form[local]").submit(function (e) {
        e.preventDefault();
        tb = $(this).attr("data-tb");
        datos = JSON.parse($(this).serializeObject());

        /*console.log($(this).data("index"));
         console.log($.isNumeric($(this).data("index")));*/

        if ($.isNumeric($(this).data("index"))) {
            $(tb).bootstrapTable("updateRow", {
                index: $(this).data("index"),
                row: datos
            });
        } else {
            $(tb).bootstrapTable("append", datos);

        }
        $(this).trigger("reset");
    });


    $("button[name='btn_add']").click();
});

function edit(datos, index) {
    $("form[local]").data("index", index);
    $("form[local]").data("id", datos.id);
    for (var clave in datos) {
        $("form[local] [name='" + clave + "']").val(datos[clave]);
    }

    /*$("form[local] input[name]").each(function(i, input){
     name = $(input).attr("name");
     
     });*/
}

function defaultAccion() {
    return '<button edit   data-toggle="modal" data-target="#modal-new" type="button" class="btn btn-sm btn-info"> <i class="fa fa-edit"></i> </button>';
}

function AccSeleccion() {
    return '<button select type="button" class="btn btn-sm btn-info"> <i class="fa fa-check"></i> Seleccionar </button>';
}