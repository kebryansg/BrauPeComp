var selections = [];
moment.locale("es");

Inputmask.extendAliases({
    'myDecimal': {
        alias: "numeric",
        groupSeparator: ',',
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        placeholder: '0'
    }
});
/* Parse Float */
function convertFloat(valor) {
    value = parseFloat(valor.toString().replace(/[^\d\.\-]/g, ""));
    return value;
}

$.fn.getFloat = function () {
    return parseFloat($(this).val().toString().replace(/[^\d\.\-]/g, ""));// $(component).val();
};
$.fn.serializeObject_KBSG = function () {
    value = {};
    components = $(this).find("[name]");
    value["id"] = ($.isEmptyObject($(this).data("id"))) ? 0 : $(this).data("id");
    $.each(components, function (i, component) {
        tagName = $(component).prop("tagName");
        name = $(component).attr("name");
        val = "";
        switch (tagName) {
            case "SELECT":
                val = $(component).selectpicker("val");
                break;
            case "INPUT":
                tipo = $(component).attr("tipo");
                console.log(tipo);
                switch (tipo) {
                    case "fecha":
                     val = formatSave($(component).val());
                     break;
                    case "decimal":
                        val = $(component).getFloat();
                        break;

                    default:
                        val = $(component).val();
                        break;
                }
                break;
        }
        value[name] = val;
    });
    console.log(value);
    //return value;
    return JSON.stringify(value);
};

/* Array Claves JSON */
function JSON_Clave(obj) {
    claves = [];
    for (var clave in obj) {
        claves.push(clave.toUpperCase());
    }
    return claves;
}

$.fn.edit = function (datos) {
    claves = JSON_Clave(datos);
    $(this).data("id", datos.id);
    $.each($(this).find("[name]"), function (i, component) {
        name = $(component).attr("name");
        if ($.inArray(name.toUpperCase(), claves) !== -1) {
            tagName = $(component).prop("tagName");
            switch (tagName) {
                case "SELECT":
                    $(component).selectpicker("val", datos[name]);
                    break;
                case "TEXTAREA":
                    val = $(component).val(datos[name]);
                    break;
                case "INPUT":
                    tipo = $(component).attr("data-tipo");
                    switch (tipo) {
                        case "myDecimal":
                            $(component).setFloat(datos[name]);
                            break;
                        case "fechaView":
                            $(component).val(formatView(datos[name]).toUpperCase());
                            break;
                        case "fecha":
                            $(component).datepicker("update", fechaMoment(datos[name]).toDate());
                            break;
                        default:
                            $(component).val(datos[name]);
                            break;
                    }
                    break;
            }

        }
    });
};


/* Inputmask format*/
function formatInputMask(value) {
    return Inputmask.format(value, "myDecimal");
}




var TablePaginationDefault = {
    //height: 400,
    pageSize: 5,
    search: true,
    pageList: [5, 10, 15, 20],
    cache: false,
    pagination: true,
    searchTimeOut: 250,
    showRefresh: true,
    sidePagination: "server"
};


function alertEliminarRegistros(row = selections) {
    values = !$.isArray(row) ? [row] : row;
    bandera = $.isArray(row);
    $.confirm({
        theme: "modern",
        escapeKey: "cancelAction",
        title: bandera ? 'Eliminar Registros?' : 'Eliminar Registro?',
        content: 'Estás seguro de continuar?',
        autoClose: 'cancelAction|8000',
        buttons: {
            deleteUser: {
                text: bandera ? 'Eliminar Registros' : 'Eliminar Registro',
                keys: ['enter'],
                action: function () {
                    deletes(values);
                    //$("div[Listado] table").bootstrapTable("refresh");
                }
            },
            cancelAction: {
                text: "Cancelar",
                action: function () {
                    //$.alert('action is canceled');
                }
            }
        }
    });
}

function deletes(values) {
    $.ajax({
        url: url_Local,
        type: "POST",
        async: false,
        data: {
            accion: "delete",
            op: op,
            ids: values
        }
    });
    selections = [];
    $("div[Listado] table").bootstrapTable("refresh");
}

$(function () {
    
    $("#cerrarSesion").click(function(e){
        e.preventDefault();
        $.post("servidor/sApp.php",{accion: "close"},function(){
            location.href = "login.php";
        });
        
    });


    /* Boton Eliminar */

    $(document).on("click", "button[name='btn_del']", function (e) {
        console.log(selections);
        if (selections.length > 0) {
            alertEliminarRegistros();
        }
    });

    /* Seleccionar diferentes registros*/
    $(document).on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, row => row.id);
        if ($.inArray(e.type, ['check', 'check-all']) > -1) {
            //Add
            $.each(ids, function (i, id) {
                if ($.inArray(id, selections) === -1)
                    selections.push(id);
            });

        } else {
            //Delete
            $.each(ids, function (i, id) {
                if ($.inArray(id, selections) > -1) {
                    selections.splice($.inArray(id, selections), 1);
                }
            });
        }
        console.log(selections);
    });




    /* Menú */

    $(".sidebar a").click(function (e) {
        e.preventDefault();
        url = $(this).attr("href");
        if (url !== "#") {
            $("#containPages").load(url);
            // Estilo
            $(".sidebar li").removeClass("active");
            $(this).closest("li").addClass("active");
        }
    });

    $(document).on("click", "button[name='btn_add']", function (e) {
        showRegistro();
        if (typeof window.initRegistro === 'function') {
            initRegistro();
        }
    });

    $(document).on("click", "form[modal-save] button[type='reset']", function (e) {
        $(this).closest(".modal").modal("hide");
    });
    $(document).on("click", "form[save] button[type='reset']", function (e) {

        hideRegistro();
    });

    $(document).on("submit", "form[save]", function (e) {
        e.preventDefault();
        datos = {};
        if (typeof getDatos === 'function') {
            datos = getDatos(this);
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
        $(table).bootstrapTable("refresh");
        $(this).trigger("reset");
        hideRegistro();
    });
    $(document).on("submit", "form[modal-save]", function (e) {
        e.preventDefault();
        datos = {
            url: $(this).attr("action"),
            dt: {
                accion: "save",
                op: $(this).attr("role"),
                datos: $(this).serializeObject()
            }
        };
        save_global(datos);
        $(this).closest(".modal").modal("hide");
    });

    /*$(document).on("click", "button[name='btn_del_individual']", function (e) {
     div_id = $(this).closest("div[toolbar]").attr("id");
     
     //alert(div_id);
     tableSelect = $("table[data-toolbar='#" + div_id + "']");
     deleteIndividual(tableSelect);
     });*/

    var dropdownMenu;
    $(window).on('show.bs.dropdown', function (e) {
        if (!$.isEmptyObject($(e.target).attr("name"))) {
            dropdownMenu = $(e.target).find('.dropdown-menu');
            $('body').append(dropdownMenu.detach());
            var eOffset = $(e.target).offset();
            dropdownMenu.css({
                'display': 'block',
                'top': eOffset.top + $(e.target).outerHeight(),
                'left': eOffset.left + $(e.target).outerWidth() - $(dropdownMenu).width()
            });
        }
    });

    $(window).on('hide.bs.dropdown', function (e) {
        if (!$.isEmptyObject(dropdownMenu)) {
            $(e.target).append(dropdownMenu.detach());
            dropdownMenu.hide();
            dropdownMenu = null;
        }
    });

    $(document).on("click", "div[tipo] button[refresh]", function (e) {
        div = $(this).closest("div[tipo]");
        fnc = $(div).attr("data-fn");
        select = $(div).find("select");
        datos = self[fnc]();
        loadCbo(datos, select);
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

function getJson(params) {
    result = {};
    $.ajax({
        url: params.url,
        async: false,
        type: 'POST',
        dataType: 'json',
        data: params.data,
        success: function (response) {
            result = response;
        }
    });
    return result;
}

/*function responseHandler(res) {
 $.each(res.rows, function (i, row) {
 row.state = $.inArray(row.ID, selections) !== -1;
 });
 return res;
 }*/

function showRegistro() {
    $("div[Listado]").fadeOut();
    $("div[Listado]").addClass("hidden");

    $("div[Registro]").fadeIn("slow");
    $("div[Registro]").removeClass("hidden");
    $("div[Registro] .selectpicker").selectpicker();
    $("div[tipo] button[refresh]").click();
}

function hideRegistro() {
    $("div[Registro]").fadeOut();
    $("div[Registro]").addClass("hidden");
    if ($("div[Registro] table").length > 0) {
        $("div[Registro] table").bootstrapTable("removeAll");
    }
    $("div[Listado]").fadeIn("slow");
    $("div[Listado] table").bootstrapTable("refresh");
    $("div[Listado] table").bootstrapTable("resetView");
    $("div[Listado]").removeClass("hidden");
    $("div[Registro] form").removeData("id");
}

function defaultBtnAccion(value, rowData, index) {
    return '<div class="btn-group" name="shows">' +
            '<button type="button" class="btn btn-default dropdown-toggle btn-sm"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
            ' <i class="fa fa-fw fa-align-justify"></i>' +
            '</button>' +
            '<ul class="dropdown-menu dropdown-menu-left" >' +
            '<li name="edit"><a href="#"> <i class="fa fa-edit"></i> Editar</a></li>' +
            ' <li name="delete" ><a href="#"> <i class="fa fa-trash"></i> Eliminar</a></li>' +
            '</ul>' +
            '</div>';
}
window.defaultEvent = {
    'click li[name="edit"]': function (e, value, row, index) {
        edit(row);
        showRegistro();
    },
    'click li[name="delete"]': function (e, value, row, index) {
        alertEliminarRegistros(row.id);
    },
    'click button[name="view"]': function (e, value, row, index) {
        viewDetalle(row);
    },
    'click li[name="download"]': function (e, value, row, index) {
        row["detalleCompleto"] = false;
        openWindowWithPost("MVC/View/Proform/fileProforma.php", row);
    },
    'click li[name="download-completo"]': function (e, value, row, index) {
        row["detalleCompleto"] = true;
        openWindowWithPost("MVC/View/Proform/fileProforma.php", row);
    },
    'click li[name="duplicate"]': function (e, value, row, index) {
        //showRegistro();
        duplicate(row);

        //openWindowWithPost("MVC/View/Proform/fileProforma.php", row);
    }



};

function deleteIndividual(tableSelect) {
    state = $(tableSelect).bootstrapTable("getSelections").map(row => row.state);
    $(tableSelect).bootstrapTable("remove", {field: 'state', values: state});
}

function defaultFecha(value, rowData, index) {
    return formatView(value);
}


function formatView(data) {
    fecha = moment(data, "YYYY-MM-DD HH:mm:ss");
    return fecha.format('MMMM D, YYYY');
}
function formatSave(data) {
    fecha = moment(data, 'MMMM D, YYYY');
    return fecha.format("YYYY-MM-DD HH:mm:ss");
}


function openWindowWithPost(url, data) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";


    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "datos";
    input.value = JSON.stringify(data);
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function loadCbo(data, select) {
    $(select).html("");
    $.each(data.rows, function (i, row) {
        option = document.createElement("option");
        $(option).attr("value", row.id);
        $(option).html(row.descripcion);
        $(select).append(option);
    });
    $(select).selectpicker("refresh");
}

function initModalNew(dataUrl) {
    html = "";
    $.ajax({
        url: dataUrl,
        async: false,
        dataType: 'html',
        success: function (html2) {
            div = $(html2).find("div[Registro]");
            $(div).removeClass("hidden");
            $(div).removeAttr("id");
            $(div).find("form").removeAttr("save");
            $(div).find("form").attr("modal-save", "");
            $(div).find('.selectpicker').selectpicker();
            html = div;
        }
    });
    return html;
}
function getEstado(value) {
    switch (value) {
        case "ACT":
            return "Activo";
            break;
        case "INA":
            return "Inactivo";
            break;
    }
}