function showError(objeto, error) {
    $(objeto).next().text(error)
}
$(document).ready(function () {
    var exp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    $("#dasbuton").on("click", function () {
        var mail1 = $("#mail1");
        var mail2 = $("#mail2");
        if (mail1.val() == "" && mail2.val() == "") {
            alert("campos vacios");
        } else if (mail1.val() == "") {
            showError(mail1, "Este campo esta vacio");
        } else if (mail2.val() == "") {
            showError(mail2, "Este campo esta vacio");
        } else if (exp.test(mail1) || exp.test(mail2)) {
            showError(mail2, "Uno de los dos correos no comple su patron");
        } else if (mail2.val() != mail1.val()) {
            showError(mail2, "No coinciden los correos");
        }else if (mail1.val() == mail2.val()){
            alert("all ok")
        }
    });
    $("#mail1").on("focus", function () {
        $(this).next().text();
    });
    $("#mail2").on("focus", function () {
        $(this).next().text();
    });

})