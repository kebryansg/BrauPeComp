var selections = [];
var TablePaginationDefault = {
    height: 400,
    pageSize: 5,
    search: true,
    pageList: [5, 10, 15, 20],
    cache: false,
    pagination: true,
    sidePagination: "server"
};
$(function () {
    /* Menú */

    $(".sidebar a").click(function (e) {
        e.preventDefault();
        url = $(this).attr("href");
        if (url !== "#") {
            $("#containPages").load(url);
            // Estilo
            $(".sidebar li").removeClass("active");
            $(this).closest("li").addClass("active");
        }
    });


    $(document).on("click", "button[name='btn_add']", function (e) {
        showRegistro();
    });
    $(document).on("click", "form[save] button[type='reset']", function (e) {
        if ($(this).closest(".modal-body").length > 0) {
            $(this).closest(".modal").modal("hide");
        } else {
            hideRegistro();
        }
    });

    $(document).on("submit", "form[save]", function (e) {
        e.preventDefault();
        datos = {};
        if (typeof window.getDatos === 'function') {
            datos = getDatos();
        } else {
            datos = {
                url: $(this).attr("action"),
                dt: {
                    accion: "save",
                    op: $(this).attr("role"),
                    datos: $(this).serializeObject()
                }
            };
        }
        save_global(datos);
        $(table).bootstrapTable("refresh");
        $(this).trigger("reset");
        hideRegistro();
    });
});


/* Funciones Default */

function save_global(datos) {
    $.ajax({
        url: datos.url,
        cache: false,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: datos.dt,
        success: function (response) {
            console.log(response);
        }
    });
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();

    /* Agregar identificador  "id" */
    o["id"] = ($.isEmptyObject($(this).data("id"))) ? 0 : $(this).data("id");

    $.each(a, function (index, row) {
        o[row.name] = row.value;
    });
    /* Agregar input de type(checkbox) */
    $.each($(this).find("input[type='checkbox']"), function (index, row) {
        o[row.name] = $(row).is(":checked");
    });
    return JSON.stringify(o);
};

function getJson(params) {
    result = {};
    $.ajax({
        url: params.url,
        async: false,
        type: 'POST',
        dataType: 'json',
        data: params.data,
        success: function (response) {
            result = response;
        }
    });
    return result;
}

function responseHandler(res) {
    $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.ID, selections) !== -1;
    });
    return res;
}

function showRegistro() {
    $("div[Listado]").fadeOut();
    $("div[Listado]").addClass("hidden");

    $("div[Registro]").fadeIn("slow");
    $("div[Registro]").removeClass("hidden");
}

function hideRegistro() {
    $("div[Registro]").fadeOut();
    $("div[Registro]").addClass("hidden");
    if ($("div[Registro] table").length > 0) {
        $("div[Registro] table").bootstrapTable("removeAll");
    }
    $("div[Listado]").fadeIn("slow");
    $("div[Listado]").removeClass("hidden");
    $("div[Registro] form").removeData("id");
}


