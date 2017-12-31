$(function(){
    get();
    $("#btnRefrescar").click(function(e){
        get();
    });
    
});
function get(){
   $.ajax({
        url: "servidor/sConfigure.php",
        cache: false,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            accion: "get",
            op: "configuracion"
        },
        success: function (response) {
            edit(response[0]);
            console.log(response);
        }
    });
}
function edit(datos){
    $("form[save]").data("id", datos.id);
    $.each($("form[save] [name]"),function(index, value){
        name = $(value).attr("name");
        $(value).val(datos[name]);
    });
}