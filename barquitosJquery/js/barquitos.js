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
        //alert(nuevasLocalizacionesBarco);
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
        $("#areamensaje").text(mensaje);
    },

    visualizarTocado: function (localizacion) {
        var celda = $("#"+localizacion);
        celda.attr("class", "tocado");
    },

    visualizarAgua: function (localizacion) {
        var celda = $("#"+localizacion);
        celda.attr("class", "agua");
    }

};
/* == Funciones para el Score == */
function getScore() {
    var scores = [];
    if (localStorage.length !=0 ) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 6) == "score_") {
                scores.push( JSON.parse(localStorage.getItem(key)));
            }
        }
    }
    return scores;
}
/* === Esta funcion es la que nos determina como ordenará el sort, ya que queremos ordenar por un campo concreto === */
function CompareForSort(obj1, obj2) {
    if (obj1.score == obj2.score)
        return 0;
    if (obj1.score < obj2.score)
        return -1;
    else
        return 1;
}

function setScore(intentos, jugador) {
    var jugador = {
        nombre: jugador,
        score: intentos
    };
    var scores = getScore();
    scores.push(jugador);
    scores.sort(CompareForSort);
    for (var i = 0; i < scores.length; i++) {
        var valor = JSON.stringify(scores[i]);
        localStorage.setItem("score_" + i, valor);

    }

}
function mostrarScore() {
    var ul = $("<ul>");
    var scores = getScore();
    for (var i = 0 ; i < scores.length; i++){
       var li =  $("<li>").text(scores[i].nombre+ "   " +scores[i].score);
        ul.append(li)
    }
     $("#dialog-score").html(ul);    
                $("#dialog-score").dialog({
                    modal: true,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                });

    }
    // fin Funciones
    // Objeto para procesar y contar los intentos de tocado y hundido
var controlador = {
        intentos: 0,
        procesarIntento: function (intento) { //Intento contiene un string del tipo "G0"
            this.intentos++;
            var impacto = modelo.fuego(intento); //impacto contiene true si es un acierto
            if (modelo.barcosHundidos === modelo.numeroBarcos) {
                $("#dialog-message").text("Has hundido todos los barcos en " + this.intentos + " intentos");
                $("#dialog-message").dialog({
                    modal: true,
                    buttons: {
                        Ok: function () {
                            $(this).dialog("close");
                        }
                    }
                });
                var jugador = prompt('Introduce tu nombre');
                setScore(this.intentos,jugador);
            }
        }
    }
    // Función que analiza un disparo del usuario y si está dentro del panel devuelve la fila y la columna correspondientes (ej: "06") Ya no es necesaria
    // Manejadores de eventos
function manejadorBotonFuego() {
        var entradaIntento = $("#entradaIntento");
        var intento = this.id;

        controlador.procesarIntento(intento); //le pasamos el id de lo que tocamos

    }
    //Funcion inicial, solo se modifican algunas cosas para adaptarlo a Jquery
function init() {
    var imagenes = "agua.png, panel.jpg, barco.png".split(",");
    var tempImg = [],
        i,
        numImagenes;
    numImagenes = imagenes.length;
    for (i = 0; i < numImagenes; i++) {
        tempImg[i] = $("<img/>");
        tempImg[i].src = imagenes[i];
    }
    // situa los barcos en el tablero
    modelo.generaLocalizacionesBarcos();
    //capturamos td yles aplicamos los eventos
    $("td").on("click", manejadorBotonFuego);
    /* === Ahora empezamos con los dialogos == */
    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });
    $("#botoncico").on("click", function () {
        var mensaje = "Barco 1: " + modelo.barcos[0].localizaciones + "Barco 2: " + modelo.barcos[1].localizaciones + "Barco 3: " + modelo.barcos[2].localizaciones;
        $("#dialog").text(mensaje);
        $("#dialog").dialog("open");
    });
    $("#botonScore").on("click", mostrarScore);

}
$(document).ready(init);