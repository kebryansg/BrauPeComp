table = $("div[Listado] table");
$(function () {
    $("div[Listado] table").bootstrapTable(TablePaginationDefault);
    //$("button[name='btn_add']").click();

});

function edit(datos) {
    form = "div[Registro] form";
    console.log(datos);
    $(form).data("id", datos.id);
    for (var clave in datos) {
        $(form + " [name='" + clave + "']").val(datos[clave]);
    }
}