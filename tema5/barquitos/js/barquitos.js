// Trabajamos con un objeto (modelo), que contiene un array (barcos), que a su vez contiene objetos con dos atributos: localizaciones y impactos (ambos arrays) 
// modelo tiene los métodos: fuego, estaHundido, generaLocalizacionesBarcos, generaBarco y colision
var modelo = {
    tamanioPanel: 7,
    numeroBarcos: 3,
    longitudBarco: 3,
    barcosHundidos: 0,

    barcos: [ //Array de objetos
 //Cada objeto (barco) tiene su localizacion (3 trozos) y sus impactos (en principio vacíos y se irán llenando con la palabra "tocado" cuando haya aciertos)
        {
            localizaciones: [0, 0, 0],
            impactos: ["", "", ""]
        },
        {
            localizaciones: [0, 0, 0],
            impactos: ["", "", ""]
        },
        {
            localizaciones: [0, 0, 0],
            impactos: ["", "", ""]
        }
 ],

    fuego: function (intento) {
        for (var i = 0; i < this.numeroBarcos; i++) {
            var barco = this.barcos[i];
            var indice = barco.localizaciones.indexOf(intento); //devuelve -1 si no encuentra la cadena buscada en las localizaciones

            //Miramos si el barco ya está tocado 
            if (barco.impactos[indice] === "tocado") {
                vista.visualizarMensaje("Este ya está tocado");
                return true;
            } else if (indice >= 0) {
                barco.impactos[indice] = "tocado";
                vista.visualizarTocado(intento); //Dibuja el barquito en el lugar del impacto (usando class y css)
                vista.visualizarMensaje("¡TOCADO!");

                if (this.estaHundido(barco)) {
                    vista.visualizarMensaje("¡HUNDIDO!");
                    this.barcosHundidos++;
                }
                return true;
            }
        }
        vista.visualizarAgua(intento);
        vista.visualizarMensaje("¡Agua!");
        return false;
    },

    estaHundido: function (barco) {
        for (var i = 0; i < this.longitudBarco; i++) {
            if (barco.impactos[i] !== "tocado") {
                return false;
            }
        }
        return true;
    },

    generaLocalizacionesBarcos: function () {
        var localizaciones;
        for (var i = 0; i < this.numeroBarcos; i++) { //genera la localización de cada barco
            do {
                localizaciones = this.generaBarco();
            } while (this.colision(localizaciones)); //repetimos generaBarco() mientras que el método colision devuelva true
            this.barcos[i].localizaciones = localizaciones;
        }
    },

    generaBarco: function () { // Sitúa el barco aleatoriamente (en vertical u horizontal)
        var direccion = Math.floor(Math.random() * 2); //genera un número entre 0 y 1
        var fila, columna;
        // se generan aleatoriamente las filas y columnas donde se va a colocar el primer trozo del barco (cada barco tiene una longitud que puede ocupar varias celdas)
        if (direccion === 1) { // horizontal
            fila = Math.floor(Math.random() * this.tamanioPanel); //genera un número entre 0 y  el tamaño del panel (empieza en cualquier fila)
            columna = Math.floor(Math.random() * (this.tamanioPanel - this.longitudBarco));
            //genera un número entre 0 y el tamaño panel -longitud barco (para que no se salga del panel por la derecha) 
        } else { // vertical
            fila = Math.floor(Math.random() * (this.tamanioPanel - this.longitudBarco)); //puede empezar desde la columna 0 hasta tamañopanel-longitud barco (para que no se salga por abajo)
            columna = Math.floor(Math.random() * this.tamanioPanel); //Puede empezar en cualquier columna
        }

        var nuevasLocalizacionesBarco = [];
        for (var i = 0; i < this.longitudBarco; i++) { //Da los siguientes trozos del barco 
            if (direccion === 1) { //horizontal
                nuevasLocalizacionesBarco.push(fila + "" + (columna + i)); // Ponemos "" para que lo convierta en un string y no sume los valores numéricos
            } else {
                nuevasLocalizacionesBarco.push((fila + i) + "" + columna); //vertical
            }
        }
        alert(nuevasLocalizacionesBarco);
        return nuevasLocalizacionesBarco; //devuelve un array con contenido parecido a : 04,14,24
    },

    colision: function (localizaciones) { //localizaciones es un array con la localización de cada trozo del barco (ej: 04,14,24)
        for (var i = 0; i < this.numeroBarcos; i++) { //Busca cada una de las localizaciones generadas en todos los barcos y si encuentra una colisión devuelve true
            var barco = this.barcos[i];
            for (var j = 0; j < localizaciones.length; j++) {
                if (barco.localizaciones.indexOf(localizaciones[j]) >= 0) { //Si hay colisión 
                    return true;
                }
            }
        }
        return false;
    }

};


var vista = {
    visualizarMensaje: function (mensaje) {
        var areaMensaje = document.getElementById("areamensaje");
        areaMensaje.innerText = mensaje;
    },

    visualizarTocado: function (localizacion) {
        var celda = document.getElementById(localizacion);
        celda.setAttribute("class", "tocado");
    },

    visualizarAgua: function (localizacion) {
        var celda = document.getElementById(localizacion);
        celda.setAttribute("class", "agua");
    }

};
// Objeto para procesar y contar los intentos de tocado y hundido
var controlador = {
    intentos: 0,

    procesarIntento: function (intento) { //Intento contiene un string del tipo "G0"
        var localizacion = analizaIntento(intento); //localizacion contiene un string del tipo "60"
        if (localizacion) {
            this.intentos++;
            var impacto = modelo.fuego(localizacion); //impacto contiene true si es un acierto
            if (modelo.barcosHundidos === modelo.numeroBarcos) {
                vista.visualizarMensaje("Has hundido todos los barcos en " + this.intentos + " intentos");
            }
        }
    }
}


// Función que analiza un disparo del usuario y si está dentro del panel devuelve la fila y la columna correspondientes (ej: "06")

function analizaIntento(intento) {
    var alfabeto = ["A", "B", "C", "D", "E", "F", "G"];

    if (intento === null || intento.length !== 2) {
        alert("Teclea una letra y un número");
    } else {
        var fila = intento.charAt(0); //Convierte la letra en un índice de fila
        var columna = intento.charAt(1);

        if (isNaN(fila) || isNaN(columna)) {
            alert("¡Fuera del panel!");
        } else if (fila < 0 || fila >= modelo.tamanioPanel ||
            columna < 0 || columna >= modelo.tamanioPanel) {
            alert("¡Fuera del panel!");
        } else {
            return fila + columna;
        }
    }
    return null;
}


// Manejadores de eventos
function manejadorBotonFuego() {
    var entradaIntento = document.getElementById("entradaIntento");
    var intento = this.id;

    controlador.procesarIntento(intento);//le pasamos el id de lo que tocamos
    
}
/*
function manejadorKeyPress(e) {
    var botonFuego = document.getElementById("botonFuego");

    // Lo siguiente es para evitar los problemas con IE9 y anteriores,
    // en esos navegadores el manejador de eventos no se pasa adecuadamente a la función manejadora
    e = e || window.event;

    if (e.keyCode === 13) {
        botonFuego.click();
        return false;
    }
}

*/

function init() {
    var imagenes = "agua.png, panel.jpg, barco.png".split(",");
    var tempImg = [],
        i,
        numImagenes;
    numImagenes = imagenes.length;
    for (i = 0; i < numImagenes; i++) {
        tempImg[i] = document.createElement("img");
        tempImg[i].src = imagenes[i];
    }
    // situa los barcos en el tablero
    modelo.generaLocalizacionesBarcos();
    //capturamos td
    var tede = document.getElementsByTagName('td');

    for (var a = 0; a < tede.length; a++) {
        tede[a].addEventListener("click", manejadorBotonFuego, false);
        
    }
}
window.addEventListener("load", init);