/*=== DIALOGOS  ===*/
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
            toastr.warning(mensaje);

        } else if (tipo == '3') {
            toastr.error(mensaje);
        } else {
            toastr.success(mensaje);
        }
    }
}
/*===  fin ===*/

function funciona(posicion) {
    var lon = posicion.coords.longitude;
    var lat = posicion.coords.latitude;
    //Center of map
    var lonlat = new OpenLayers.LonLat(0, 0);

    var map = new OpenLayers.Map("map-prec");
    // Create OSM overlays
    var mapnik = new OpenLayers.Layer.OSM();

    var layer_cloud = new OpenLayers.Layer.XYZ(
        "clouds",
        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png", {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );

    var layer_precipitation = new OpenLayers.Layer.XYZ(
        "precipitation",
        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png", {
            isBaseLayer: false,
            opacity: 0.7,
            sphericalMercator: true
        }
    );


    map.addLayers([mapnik, layer_precipitation, layer_cloud]);
    map.setCenter(lonlat, 3)
}

function errorSituacion() {
    tostada("Error en la situacion", 3);
}

function main() {
    if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
        //navigator.geolocation.getCurrentPosition(visualizar, errorSituacion); 
        navigator.geolocation.getCurrentPosition(funciona, errorSituacion); 
        
    } else {
        tostada("No hay soporte de geolocalización", 2);
    }
}
window.addEventListener("load", main);