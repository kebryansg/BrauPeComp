$(function () {

    /*
     * Inicializar Datos
     */

    $("td[name='fecha']").html(formatView(datos.fecha));

    $('[name="envio"]').html(datos.envio);
    $('[name="garantia"]').html(datos.garantia);
    $('[name="codigo"]').html(datos.codigo);

    /*
     * Cliente
     */
    cliente = getJson({
        url: "../../../servidor/sCliente.php",
        data: {
            accion: "get",
            op: "",
            idCliente: datos.idcliente
        }
    });
    $("td[name='cliente']").html(datos.nombres);
    $("td[name='cliente_ruc']").html(cliente.identificacion);
    $("td[name='cliente_telefono']").html(cliente.telefono);

    /*
     * Detalles
     */
    detalles = getJson({
        url: "../../../servidor/sProforma.php",
        data: {
            accion: "list",
            op: "DetallePorforma",
            idProforma: datos.id
        }
    });
    detalles_format = [];
    subtotal = 0;
    subtotal_unit = 0;
    iva = 0;
    console.log(detalles);
    if (datos.detalleCompleto) {
        $("table[detalle]").bootstrapTable();
        detalles_format = $.map(detalles,function(row){
            subtotal += ((parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)) * parseFloat(row.cantidad));
            precioUnit = parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12);
            precioTotal = ((parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)) * parseFloat(row.cantidad));
            return {
                cantidad: row.cantidad,
                producto: row.producto,
                precioUnit: precioUnit.toFixed(2),
                precioTotal: precioTotal.toFixed(2)
            };
        });
        
        $("table[detalle]").bootstrapTable("load", detalles_format);
        
    } else {
        $.each(detalles, function (i, row) {
            tr = document.createElement("tr");

            $(tr).html("<td>" + row.cantidad + "</td> <td>" + row.producto + "</td>");
            subtotal_unit += parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12);
            subtotal += ((parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)) * parseFloat(row.cantidad));
            $("table[detalle] tbody").append(tr);
        });
        subtotal_unit += parseFloat(datos.ganancia) / 1.12;
        subtotal += parseFloat(datos.ganancia) / 1.12;

        $("table[detalle] tbody tr:first").append("<td rowspan='" + detalles.length + "'>" + subtotal_unit.toFixed(2) + "</td> <td rowspan='" + detalles.length + "'> " + subtotal.toFixed(2) + "</td> ");
        $("table[detalle]").bootstrapTable();
    }

    iva = (subtotal * 0.12);

    $("input[name='subtotal']").val(subtotal.toFixed(2));
    $("input[name='iva']").val(iva.toFixed(2));
    $("input[name='total']").val((subtotal + iva).toFixed(2));


    /*
     * Config
     */
    config = getJson({
        url: "../../../servidor/sConfigure.php",
        data: {
            accion: "get",
            op: "configuracion"
        }
    })[0];


    $("td[name='ruc']").html(config.ruc);
    $("td[name='celular']").html(config.celular);
    $("td[name='direccion']").html(config.direccion);
    $("td[name='email']").html(config.email);


    /*
     * Generar IMG
     */
    var element = $("#proforma")[0];
    $("#btnGenerarIMG").on('click', function () {
        $("a[dw]").removeClass("hidden");

        //$(element).css("padding","0 20px");

        html2canvas(element).then(function (canvas) {
            //var image = canvas.toDataURL("image/png").replace("image/png", "data:application/octet-stream");
            var image = canvas.toDataURL();
            $("a[dw]").attr("download", 'prof ' + datos.codigo + '.png');
            $("a[dw]").attr("href", image);
        });
    });
});


