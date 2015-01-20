/* == Variable Globales === */
var lon;
var lat;
var htmlbox = document.createElement('div');
/*=== DIALOGOS  ===*/
/* creamos una toastar para monstrar lso mensajes de errores */
function tostada(mensaje, tipo) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    if (mensaje !== '') {
        if (tipo == '2') {
            html
            toastr.warning(mensaje);

        } else if (tipo == '3') {
            toastr.error(mensaje);
        } else {
            toastr.success(mensaje);
        }
    }
}
/*===  fin ===*/
/* === FUNCIONES GENERALES ==== */
function colocarTiempo(tiempo, elemento) {

    var imagen = document.createElement('img');
    imagen.setAttribute("src", "http://openweathermap.org/img/w/" + tiempo[0].icon + ".png");
    var estado = document.createElement('p');
    estado.textContent = "Estado: " + tiempo[0].main + ", " + tiempo[0].description;
    elemento.appendChild(imagen);
    elemento.appendChild(estado);
}
/** Esta es la llamda de AJAX que usamos para añadir el tiempo en el marcador,
 *   recibe latitud longitud y el div en el que añadira los elementos
 */
function llamarAjax(lat, long, box) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=e7b304bf4e7b4534d4a68021488320f6",
        success: function (result) {
            colocarDom(result, box);
        },
        error: function () {
            tostada("No se ha recibido el tiempo", 3);
        }
    });
}

function colocarDom(resultado, elemento) {
    var titulo = document.createElement('h3');
    titulo.textContent = resultado.name;
    elemento.appendChild(titulo);
    colocarTiempo(resultado.weather, elemento);
    var ul = document.createElement('ul');
    var li0 = document.createElement('li');
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');
    //le damos contenido a los li
    var temp = Math.round(resultado.main.temp_min - 273.15);
    var tempMin = Math.round(resultado.main.temp_min - 273.15);
    var tempMax = Math.round(resultado.main.temp_max - 273.15);
    li0.textContent = "Temperatura: " + temp + " ºC";
    li1.textContent = "Temperatura Min: " + tempMin + " ºC";
    li2.textContent = "Temperatura Max: " + tempMax + " ºC";
    li3.textContent = "Presion: " + resultado.main.pressure + " hPa";
    li4.textContent = "Humedad: " + resultado.main.humidity + " %";
    //añadimos los li
    ul.appendChild(li0);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    elemento.appendChild(ul);
}

function colocarDomDias(){
    
}

/* ==== FUNCIONES DE MAPA ==== */

function visualizar(posicion) {
    lat = posicion.coords.latitude;
    lon = posicion.coords.longitude;
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=e7b304bf4e7b4534d4a68021488320f6",
        success: function (result) {
            colocarDom(result, htmlbox);
        },
        error: function () {
            tostada("No se ha recibido el tiempo", 3);
        }
    });

    /* Usamos el mismo Gmaps para crear una ventana y su marcador correspondiente*/
    map = new GMaps({
        div: '#mapa',
        lat: lat,
        lng: lon
    });
    map.addMarker({
        lat: lat,
        lng: lon,
        title: 'El tiempo en Tu ciudad',
        infoWindow: {
            content: htmlbox,
            maxWidth: 500

        }
    });
    /*Utilizamos de nuevo Gmaps para facilitarnos la vida y añadir menu contextual*/
    map.setContextMenu({
        control: 'map',
        options: [{
            title: 'Añadir una marca',
            name: 'add_marker',
            action: function (e) {
                var box = document.createElement('div');
                llamarAjax(e.latLng.lat(), e.latLng.lat(), box)
                this.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                    title: 'Marca',
                    infoWindow: {
                        content: box,
                        maxWidth: 500

                    }
                });

            }
  }, {
            title: 'Centrar',
            name: 'Centrar Aquí',
            action: function (e) {
                this.setCenter(e.latLng.lat(), e.latLng.lng());
            }
  }]
    });
    /*Llamamos a la funcion getDias pra que nos de la previsión de los próximos días en nuestra zona*/
    getDias();
}

function getDias() {

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=3&APPID=e7b304bf4e7b4534d4a68021488320f6",
        success: function (result) {
            var col1 = document.getElementById('col1');

            colocarDom(result.list[0], col1);
            var col2 = document.getElementById('col2');
            colocarDom(result.list[1], col2);
            var col3 = document.getElementById('col3');
            colocarDom(result.list[2], col3);
        },
        error: function () {
            tostada("No se ha recibido el tiempo de dias futuros", 3);
        }
    });

}

function errorSituacion() {
    tostada("Error en la Situacion", 3);
}


/*  ==== Funcion Pricipal =====  */
function main() {
    if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
        //navigator.geolocation.getCurrentPosition(visualizar, errorSituacion); 
        navigator.geolocation.getCurrentPosition(visualizar, errorSituacion); //Llamamos al método getCurrentPosition y le pasamos una función manejadora

    } else {
        tostada("No hay soporte de geolocalización", 2);
    }

}
window.addEventListener("load", main);