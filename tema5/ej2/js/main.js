function maxLetras() {
    var tamanio = this.value.length;
    if (tamanio > 100) {
        this.nextElementSibling.innerText = "Maximo de caracteres alcanzado";
    } else {
        var libres = 100 - tamanio;
        this.nextElementSibling.innerHTML = "";
        this.nextElementSibling.innerText = "Quedan " + libres;
    }


}

function validarTest() {
    var contestadas =0;
    var no_contestadas = 0;
    var acertadas = 0;
    var erroneas = 0;
    //capturas
    var nombre = document.getElementById('nombre').value + " " + document.getElementById('apellidos').value;
    document.getElementById('alumno').innerText = nombre;
    var labelAcertadas = document.getElementById('aciertos');
    var labelTiempo = document.getElementById('tiempo');
    var labelPorcentaje = document.getElementById('porcentaje');
    var labelErrores = document.getElementById('errores');
    var labelContestadas = document.getElementById('contestadas');
    var labelNoContestadas = document.getElementById('no_contestadas');       
    //Comenzamos con la validacion
    var pregunta1 = document.getElementsByName('pregunta1');
    var pregunta2 = document.getElementById('pregunta2');
    var pregunta3 = document.getElementsByName('pregunta3');
   
    if  (pregunta1[2].checked){
        contestadas++;
        acertadas++;
    }else if (pregunta1 == "") {
        no_contestadas++;
    }else{
        contestadas++;
        erroneas++;
    }
    if  (pregunta2.value == " "){
        no_contestadas++;
    }else if (pregunta2.value == "href"){
        contestadas++;
        acertadas++
        
    }else{
        erroneas++;
        contestadas++;
    }
    //Asignaciones Finales
    labelAcertadas.innerText = "Acertadas: "+acertadas;
    labelErrores.innerText = "Falladas: "+erroneas;
    labelContestadas.innerText = "Contestadas: "+contestadas;
    labelNoContestadas.innerText= "No Contestadas: "+no_contestadas;
    
}

function main() {
    var tiempoLabel = document.getElementById('tiempo');
    var tiempo;
    //
    function timestap (){
        tiempo++;
        tiempoLabel.innerHTML = "";
        tiempoLabel.contains = "LLevas "+ tiempo + " S";
        
    }
    setInterval(timestap, 1000);
    //capturamos los elementos para colocarle escuchadores
    var sugerencia = document.getElementById('sugerencia');
    var botonEnviar = document.getElementById('enviar');
    botonEnviar.addEventListener("click", validarTest);
    //
    sugerencia.addEventListener('keypress', maxLetras);
    sugerencia.addEventListener('keyup', maxLetras);
}

window.onload = main;