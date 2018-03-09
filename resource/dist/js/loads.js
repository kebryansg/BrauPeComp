/* Aplicar el TRUE check rows  */
function responseHandlerSelect(res) {
    $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.id, selections) !== -1;
    });
    return res;
}

function getURL(url) {
    switch (url) {
        case "_app":
            return "servidor/sApp.php";
            break;
        case "_cliente":
            return "servidor/sCliente.php";
            break;
        case "_producto":
            return "servidor/sProducto.php";
            break;
        case "_proforma":
            return "servidor/sProforma.php";
            break;
        case "_catalogo":
            return "servidor/sCatalog.php";
            break;
    }
}

function loadUsuarios(params){
    json_data = {
        data: $.extend({}, {
            op: "usuario",
            accion: "list"
        }, params.data),
        url: getURL("_app")
    };
    params.success(getJson(json_data));
}

function loadCliente(params) {
    json_data = {
        data: $.extend({}, {
            op: "cliente",
            accion: "list"
        }, params.data),
        url: getURL("_cliente")
    };
    params.success(getJson(json_data));
}

function loadProducto(params) {
    json_data = {
        data: $.extend({}, {
            op: "producto",
            accion: "list"
        }, params.data),
        url: getURL("_producto")
    };
    params.success(getJson(json_data));
}

function loadProforma(params) {
    json_data = {
        data: $.extend({}, {
            op: "proforma",
            accion: "list"
        }, params.data),
        url: getURL("_proforma")
    };
    params.success(getJson(json_data));
}

function loadGarantia(params = null) {
    data = {
        op: "garantia",
        accion: "list"
    };
    if (params !== null) {
        json_data = {
            data: $.extend({}, data, params.data),
            url: getURL("_catalogo")
        };
        params.success(getJson(json_data));
    } else {
        return getJson({
            data: data,
            url: "servidor/sCatalog.php"
        });
}
}