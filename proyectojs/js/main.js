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

    /* ==== FUNCIONES DE MAPA ==== */
    function visualizar(posicion) {
        var lat = posicion.coords.latitude;
        var lon = posicion.coords.longitude;
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon,
            success: function (result) {
                tostada("Se ha recibido el objeto");
                alert(result);
            },
            error: function () {
                alert("error");
            }
        });
    }

    function errorSituacion() {
        tostada("Error en la situacion", 3);
    }
    /*  ==== Funcion Pricipal =====  */
    function main() {
        if (navigator.geolocation) { // Nos aseguramos de que el navegador soporta la API Geolocation
            navigator.geolocation.getCurrentPosition(visualizar, errorSituacion); //Llamamos al método getCurrentPosition y le pasamos una función manejadora
        } else {
            alert("No hay soporte de geolocalización");
        }

    }
    window.addEventListener("load", main);