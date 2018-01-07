$(function () {
    $("table[init]").bootstrapTable(TablePaginationDefault);
    $("input[data-inputmask]").inputmask();
    
    
    $("table[detalle]").bootstrapTable({
        cache: false,
        height: 300
    });
    
    /*$("button[addTable]").click(function(e){
        table = $(this).attr("data-target");
        datos= {
            producto: "",
            cantidad: 1,
            precioProveedor: 0,
            precioComision: 0
        };
        $(table).bootstrapTable("append",datos);
    });*/
    
    $("form[local]").submit(function(e){
        e.preventDefault();
        tb = $(this).attr("data-tb");
        datos = JSON.parse($(this).serializeObject());
        $(tb).bootstrapTable("append", datos);
        $(this).trigger("reset");
    });
    
    
    $("button[name='btn_add']").click();
});

function defaultAccion(){
    return '<button edit type="button" class="btn btn-sm btn-info"> <i class="fa fa-edit"></i> </button>';
}