$(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        $.post("servidor/sApp.php", {
            accion: $(this).attr("role"),
            u: $("input[u]").val(),
            p: $("input[p]").val()

        },
                function (res) {
                    r = JSON.parse(res);
                    if (r.status) {
                        location.href = r.location;
                    } else {
                        alert(r.mjs);
                    }
                });
    });

});