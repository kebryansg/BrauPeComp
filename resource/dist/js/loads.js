function loadCliente(params){
    json_data = {
        data: $.extend({}, {
            op: "cliente",
            accion: "list"
        }, params.data),
        url: "servidor/sCliente.php"
    };
    params.success(getJson(json_data));
}

function loadProducto(params){
    json_data = {
        data: $.extend({}, {
            op: "producto",
            accion: "list"
        }, params.data),
        url: "servidor/sProducto.php"
    };
    params.success(getJson(json_data));
}

function loadProforma(params){
    json_data = {
        data: $.extend({}, {
            op: "proforma",
            accion: "list"
        }, params.data),
        url: "servidor/sProforma.php"
    };
    params.success(getJson(json_data));
}