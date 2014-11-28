function calcularLetra(campoDni) {

    var dni = campoDni;
    var cadena = 'TRWAGMYFPDXBNJZSQVHLCKE';
    var operacion = dni % 23;
    alert(operacion);
    alert(cadena.substring(operacion, operacion + 1));
    return cadena.substring(operacion, operacion + 1);


}

function enviarDatos(evt) {
    var dni = document.getElementById('campoInsertar').value;
    var letra = document.getElementById('campoLetras').value;
    var error = document.getElementById('error');
    if (dni.length == 0) {
        error.textContent = "Debes de introducir un DNI";
        evt.preventDefault;
    } else if (dni.length > 8) {
        error.textContent = "Quizas, y solo quizás sobren algunos numeros... pero no me hagas mucho caso Tan solo soy un mensaje de error ¿ no?";
        evt.preventDefault;
    } else if (calcularLetra(dni) != letra) {
        error.textContent = "No es la letra correspondiente";
        evt.preventDefault;
    } else {
        error.textContent = " ";

    }

}

function filtro(e) { //e es un objeto keyboardEvent
    // El código Unicode de la tecla pulsada se almacena en keyCode o charCode. Si es un carácter visualizable se almacena en charCode, en otro caso en keyCode 
    var codigo = e.charCode || e.keyCode;
    // Si la tecla es una tecla de función, control, alt o código ASCII < 32 no se filtra
    if (codigo < 32 || e.charCode == 0 || e.ctrlKey || e.altKey) {
        return; // No filtramos el evento
    }
    // Convertimos el código del carácter en un string 
    var texto = String.fromCharCode(codigo);

    var permitidos = "0123456789"
    if (permitidos.indexOf(texto) == -1) { // Es un carácter no permitido
        this.nextElementSibling.innerText = "Sólo números";
        // Cancelamos la acción por defecto para que el texto no sea insertado 
        if (e.preventDefault) e.preventDefault();
        return false;
    }
    // Si todos los caracteres son permitidos, oculta el mensaje 
    this.nextElementSibling.innerText = "";
}

function init() {
    //camputamos para colocar escuchadores
     var dniCampo = document.getElementById('campoInsertar');
    var enviar = document.getElementById("enviar");
    var borrar = document.getElementById("borrar");

    enviar.addEventListener("click", enviarDatos,false);
    dniCampo.addEventListener("keypress", filtro, false);
}
window.addEventListener("load", init);