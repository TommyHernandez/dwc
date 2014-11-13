/*
    En este espacio vamos a definir las funciones a utilizar.
    Estas son las funciones que asociaremos a los eventos.
*/
/**
 * Funcion Pressed, la utilizamos para saber si en el cuadro de texto se pulsa intro.
 * si eso es así el contendio se añade a la lista llamando al manejador.
 **/
function pressed(e) {
    if (e.keyCode == 13) {
        manejadorClicBoton();
    }
}

function manejadorClicBoton() {
    var span = document.getElementById('oculto');
    var liant = document.getElementsByTagName('li');
    var ul = document.getElementById('listaCanciones');
    var cancion = document.getElementById('CancionTextInput').value; //usaremos solo value para coger el valor del campo
    if (cancion == "") {
        span.classList.toggle('oculto');
    } else {

        if (liant.length == 0) {
            var nuevoli = document.createElement("li");
            nuevoli.innerHTML = cancion;
            ul.appendChild(nuevoli);

        } else {
            var nuevoli = document.createElement("li");
            nuevoli.innerHTML = cancion;
            ul.appendChild(nuevoli);
            var arrayli = [];
            for (var i = 0; i < liant.length; i++) {
                arrayli[i] = liant[i].textContent;
            }
            arrayli.sort();
            for (var i = 0; i < liant.length; i++) {
                liant[i].innerText = arrayli[i];
            }

        }
    }
}
//Funcion principal
function inicio() {
    /*if (!Modernizr.localstorage) {
       
    } else {}  */
    var boton = document.getElementById('BotonAnadir'),
        campo = document.getElementById('CancionTextInput');
    var guardar = document.getElementById('guardar'),
        cargar = document.getElementById('cargar');
    boton.onclick = manejadorClicBoton;
    campo.onkeypress = pressed;
    guardar.onclick = function () {
        alert("guarda");
        var listaLi = document.getElementsByTagName('li');
        for (var i = 0; i < listaLi.length; i++) {
            var li = listaLi[i].textContent;
            localStorage.setItem("st_" + i, li);
        }
    };
    cargar.onclick = function () {
        var lista = document.getElementById('listaCanciones'),
            numero = localStorage.length;
        for (var i = 0; i < localStorage.length; i++) {
            var nuevoli = document.createElement("li");
            nuevoli.innerHTML = localStorage.getItem('st_' + i);
            lista.appendChild(nuevoli);
        }
    };

}
window.onload = inicio;