table = $("div[Listado] table");
selections = [];
op = "garantia";
url_Local = getURL("_catalogo");

$(function () {
    $("div[Listado] table").bootstrapTable(TablePaginationDefault);
});

function edit(datos) {
    form = "div[Registro] form";
    console.log(datos);
    $(form).data("id", datos.id);
    for (var clave in datos) {
        $(form + " [name='" + clave + "']").val(datos[clave]);
    }
}
