table = $("div[Listado] table");
selections = [];
//op = "garantia";
//url_Local = getURL("_catalogo");
$(function () {
    $("div[Listado] table").bootstrapTable(TablePaginationDefault);
});

function edit(datos) {
    form = "div[Registro] form";
    $(form).edit(datos);
}

function defaultEstado(value) {
    switch (value) {
        case "INA":
            return "Inactivo";
            break;
        case "ACT":
            return "Activo";
            break;
    }
}