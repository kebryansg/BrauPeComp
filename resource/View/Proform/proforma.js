$(function () {
    $("table[init]").bootstrapTable(TablePaginationDefault);
    $("table[detalle]").bootstrapTable({
        cache: false,
        height: 300
    });
    
    $("button[addTable]").click(function(e){
        table = $(this).attr("data-target");
        $(table).bootstrapTable("append",{});
    });
    
    $("button[name='btn_add']").click();
});