$(function () {

    /*
     * Inicializar Datos
     */

    $("td[name='fecha']").html(formatView(datos.fecha));

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
    iva = 0;

    $.each(detalles, function (i, row) {
        detalles_format.push({
            cantidad: row.cantidad,
            producto: row.producto,
            precioUnit: (parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)).toFixed(2),
            precioTotal: ((parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)) * parseFloat(row.cantidad)).toFixed(2)
        });
        subtotal += ((parseFloat(row.precioProveedor) + (parseFloat(row.precioComision) / 1.12)) * parseFloat(row.cantidad));
    });
    iva = (subtotal * 0.12);

    $("input[name='subtotal']").val(subtotal.toFixed(2));
    $("input[name='iva']").val(iva.toFixed(2));
    $("input[name='total']").val((subtotal + iva).toFixed(2));
    
    $("#detalle").bootstrapTable();
    $("#detalle").bootstrapTable("load", detalles_format);
    /*
     * Config
     */


    var element = $("#proforma")[0];


    $("#btnGenerarIMG").on('click', function () {
        $("a[dw]").removeClass("hidden");

        html2canvas(element).then(function (canvas) {
            //var image = canvas.toDataURL("image/png").replace("image/png", "data:application/octet-stream");
            var image = canvas.toDataURL();
            $("a[dw]").attr("download", 'proforma.png');
            $("a[dw]").attr("href", image);
            //a.href = image;
            //window.location.href = image;
        });
    });
});


