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



function main() {
      var map = new ol.Map({
        layers: [
     new ol.layer.Tile({
                source: new ol.source.OSM()
            })
   ],
        renderer: 'canvas',
        target: 'map',
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        })
    });

    //Añadimos un control de zoom 

    map.addControl(new ol.control.ZoomSlider());


}
window.addEventListener("load", main);