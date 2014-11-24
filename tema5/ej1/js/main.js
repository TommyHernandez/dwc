/**
    Este Script se encarga de validar el formulario de forma que no puedas avanzar si no esta todo rellenos y completado correctamente.
**/
function confirmaSalida() {
    //Devuelve el mensaje que aparecerá junto con dos botones(uno para abandonar y otro para permanecer en la página)       
    return "Vas a abandonar esta pagina. Todo lo que hay en ella se perderá";

}

function validarVacio(evt) {
    // Generalizamos para que podamos ver si está vacío cualquier elemento
    if (this.value == "") {
        this.nextElementSibling.innerText = "Vacío!"; //la etiqueta <span>
        return false;
    } else {
        this.nextElementSibling.innerText = "";
        return true;
    }
}

function repetirClave(evt) {
    var clave1 = document.getElementById('key').value;
    var clave2 = document.getElementById('key2').value;
    if (this.value == "") {
        this.nextElementSibling.innerText = "Campo vacio";
    } else if (clave1 == clave2) {
        this.nextElementSibling.innerText = "";
    } else {
        this.nextElementSibling.innerText = "No coincide la contraseña";

    }
}

function expresionKey(evt) {
    var expresion = /[A-z]\d+/;
    if (this.value.length < 8) {
        this.nextElementSibling.innerText = "Debe de tener minimo 8 caracteres";
        return false;
    } else if (expresion.test(this.value)) {
        this.nextElementSibling.innerText = "";
    } else {
        this.nextElementSibling.innerText = "No cumple los requisitos minimos";
        return false;
    }
    return true;
}

function isValidEmail(mail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}

function inicio() {
    document.getElementById('nombre').onblur = validarVacio;
    var campoclave = document.getElementById('key');
    var campoclave2 = document.getElementById('key2');
    var mail = document.getElementById('mail');
    var labelBots = document.getElementById('labelbots');
    var inputBot = document.getElementById('antibots');
    //preparamos los aleatorios
    var aleatorio = Math.floor(Math.random() * (10 - 1 + 1)) + 0;
    var aleatorio1 = Math.floor(Math.random() * (10 - 1 + 1)) + 0;
    //fin
    //definimos la cadena
    var cad = aleatorio + " + " + aleatorio1;
    var result = (aleatorio + aleatorio1) * 5 + 3;
    inputBot.setAttribute("data-bot", result);
    //insertamos la cadena
    labelBots.innerText = labelBots.textContent + " " + cad;
    //fin de ambas cosas
    document.getElementById('antibots').addEventListener("blur", validarVacio);
    mail.addEventListener("blur", validarVacio);
    campoclave.addEventListener("blur", expresionKey);
    campoclave2.addEventListener("blur", repetirClave);
    //boton enviar
    document.getElementById('enviar').addEventListener("click", function (evt) {
        evt.preventDefault();
        //capturamos nodos
        var nombre = document.getElementById('nombre').value;
        var bot = document.getElementById('antibots');
        var antibot = (bot.getAttribute('data-bot') - 3) / 5;
        var mail = document.getElementById('mail').value;
        //

        if (document.getElementById('condiciones').checked) {

            if (nombre.length <= 3) {
                alert('El nombre es MAYOR de 3 caracteres.');
            } else if (!isValidEmail(mail)) {
                alert('Debe de ser un mail valido!');

            } else if (!repetirClave) {

            } else if (bot.value != antibot) {
                alert('Largo bot');
            }


        } else {
            alert("Debes de aceptar los terminos y condicones");
        }

    });
}




window.onload = inicio;
window.onbeforeunload = confirmaSalida; //Si se cierra la página pide confirmación