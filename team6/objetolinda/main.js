function init() {
    //objeto linda, esto es una definicion de objeto literal
    var linda = {
        nombre: "linda",
        peso: 40,
        raza: "mezcla",
        gustos: ["pasear", "pelotas"]
    };
    //capturamos nodo
    var parrafo = document.getElementById('parrafo');
    //variables
    var string;
    for (var gst in linda.gustos) {
        if (gst == linda.gustos.length - 1) {
            string = linda.gustos[gst] + ".";
        } else {
            string = linda.gustos[gst] + ",";
        }
    }
    parrafo.textContent = "A "+linda.nombre+ "le gusta " + string;

}

window.addEventListener('load', init)