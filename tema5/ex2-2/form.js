window.onload = function () {

    var li = document.createElement('li');
    var bt = document.getElementById("bt");
    var condiciones = document.getElementById('acepto');
    var nodoSuma = document.getElementById('suma');


    var digitos = document.getElementsByTagName("span");
    var n1 = Math.floor(Math.random() * 9 + 1);
    var n2 = Math.floor(Math.random() * 9 + 1);
    digitos[0].innerText = n1;
    nodoSuma.setAttribute("n1", n1);
    digitos[1].innerText = n2;
    nodoSuma.setAttribute("n2", n2);

    var bt = document.getElementById("bt");
    document.miForm.bt.disabled = true;
    document.getElementById('bt').addEventListener("click", validar);
    condiciones.addEventListener("click", function () {
        if (condiciones.checked) {
            document.miForm.bt.disabled = false;
        } else {
            document.miForm.bt.disabled = true;
        }
    });

}

function validar(evt) {
    evt.preventDefault();
    var ok = true;

    var errUsuario = false;
    var nom = document.getElementById("nombre").value;
    var error = document.getElementById('errores');
    if (nom == null || nom.length == 0 || /^\s+$/.test(nom)) {
        //(/^\s+$/.test(valor)) obliga a que el valor introducido por el usuario no sólo esté formado por espacios en blanco.
        errUsuario = true;
        msg = "* El Usuario que ha introducido está vacío o no es válido.\n";
        error.textContent = msg;
        ok = false;
    }

    var errMail = false;
    var mail = document.getElementById("mail").value;

    var expreg3 = new RegExp("^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$");
    if (!expreg3.test(mail)) {
        errEmail = true;
        msg = "* El formato de Correo-e no es válido.\n";
        ok = false;
        error.textContent = msg;
    }



    var errClave = false;
    var clave = document.getElementById("clave").value;
    if (clave < 8) {
        ok = false;
        errClave = true;
        msg = "\t * lA CLAVE ES INFERIOR A 8 CARACTERES.\n";
        error.textContent = msg;
    } else {
        valido = false;
        for (var i = 0; i < clave.length; i++) {
            if (isNaN(clave.indexOf(i))) {
                ok = false;
                errClave = true;
            }
        }
    }

    var errClavesDistintas = false;
    var clave2 = document.getElementById("clave2").value;
    if (clave != clave2) {
        ok = false;
        errClavesDistintas = true;
        msg = "* LAS CLAVES NO COINCIDEN.\n";
    }

    var suma = document.getElementById("suma").value;
    var nodoSuma = document.getElementById('suma');
    var di1 = nodoSuma.getAttribute('n1') - 0;  
    var di2 = nodoSuma.getAttribute('n2') - 0 ;    
    var res = di1 + di2;
    alert(res);

    var errSuma = false;
    if (suma != res) {
        ok = false;
        errSuma = true;
        msg = "* EL RESULTADO DE LA SUMA ES INCORRECTO.\n";
        error.textContent = msg;
    }
    if (!ok) {
        alert(msg);
        //Dejar el foco en la caja de texto correspondiente.
        if (errUsuario) {
            miForm.nombre.select();
            miForm.nombre.focus();
        } else if (errMail) {
            miForm.mail.select();
            miForm.mail.focus();


        } else if (errClave) {
            miForm.clave.select();
            miForm.clave.focus();
        } else if (errClavesDistintas) {
            miForm.clave.value = "";
            miForm.clave2.value = "";
            miForm.clave.select();
            miForm.clave2.select();
            miForm.clave2.focus();
        }


        return ok;
    }

    if (errUsuario == false && errEmail == false && errClave == false && errClavesDistintas == false && errSuma == false && errCheckBox == false) {

        document.miForm.bt.disabled = false;
        evt.submit();

    }

}