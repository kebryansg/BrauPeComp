$(function () {
    get();
    $("#btnRefrescar").click(function (e) {
        get();
    });

    $("#file").change(function () {
        readURL(this);
    });

    $("#updateImg").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "servidor/upImg.php", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable request pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function (data)   // A function to be called if request succeeds
            {
                window.location.reload();
                /*$('#loading').hide();
                $("#message").html(data);*/
            }
        });
    });

});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('img[name="logo"]').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


function get() {
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
function edit(datos) {
    $("form[save]").data("id", datos.id);
    $.each($("form[save] [name]"), function (index, value) {
        name = $(value).attr("name");
        $(value).val(datos[name]);
    });
}