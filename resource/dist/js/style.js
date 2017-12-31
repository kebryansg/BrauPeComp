$(function () {
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