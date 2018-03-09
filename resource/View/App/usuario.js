table = $("div[Listado] table");
selections = [];
//op = "garantia";
//url_Local = getURL("_catalogo");
$(function(){
    $("div[Listado] table").bootstrapTable(TablePaginationDefault);
});

function edit(datos) {
    form = "div[Registro] form";
    $(form).edit(datos);
}