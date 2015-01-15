funtion main() {
    if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
        navigator.geolocation.getCurrentPosition(visualizarSituacion, errorSituacion); //Llamamos al método getCurrentPosition y le pasamos una función manejadora
    } else {
        alert("No hay soporte de geolocalización");
    }
}

function addMarker(mapa, googleLatLong, titulo, contenido) { //Crear el marcador (primero el objeto con las opciones)
    var opcionesMarker = {
        position: googleLatLong,
        map: mapa,
        title: titulo,
        clickable: true
    };
    var marcador = new google.maps.Marker(opcionesMarker); //crear la ventana de información
    var opcionesVentanaInfo = {
        content: contenido,
        position: googleLatLong
    };
    var ventanaInfo = new google.maps.InfoWindow(opcionesVentanaInfo); // crear un manejador para el evento click en el marcador
    google.maps.event.addListener(marcador, "click", function () {
        ventanaInfo.open(mapa);
    });

    function visualizarSituacion(posicion) {
        // Obtenemos latitud y longitud del objeto position.coords
        var latitud = posicion.coords.latitude;
        var longitud = posicion.coords.longitude;
        var div = document.getElementById("situacion");
        div.textContent = "Estás en Latitud: " + Math.round(latitud * 100) / 100 + " Longitud: " + Math.round(longitud * 100) / 100;
        //Empezamos con los mapas
        var divMapa = document.getElementById('mapa');
        var googleLatLong = new google.maps.LatLng(latitud, longitud);
        var opcionesMapa = {
            zoom: 10,
            center: googleLatLong, //objeto creado con las coordenadasmapTypeId: google.maps.MapTypeId.ROADMAP
        };
        mapa = google.maps.map(divMapa, opcionesMapa);
        //marcadores
        var titulo = "Tu situación;
        var contenido = "Tu estás aquí: " + coordenadas.latitude + ", "+ coordenadas.longitude;
        addMarker(mapa, googleLatLong, titulo, contenido);
        /*Pico mulhacen*/
         var titulo = "Mulhacen;
        var contenido = "Pico Mulhacen";
        addMarker(mapa, googleLatLong, titulo, contenido);

    }

    function errorSituacion(error) {
        var tiposError = {
            0: "Error desconocido",
            1: "Permiso denegado por el usuario",
            2: "Posicion no disponible",
            3: "Tiempo excedido"
        };
        var mensajeError = tiposError[error.code];
        if (error.code === 0 || error.code === 2) {
            mensajeError = mensajeError + " " + error.message;
        }
        var div = document.getElementById("error");
        div.innerHTML = mensajeError;
    }
    window.addEventListener("load", main);