function inicio() {
    var na = document.getElementsByTagName("a");
    var numeroa = na.length;
    var enlaces = 0;
    alert("Hay " + numeroa + " enlzaces");
    for (var a = 0; a < numeroa; a++) { 
        if (na[a].getAttribute("href") == "http://prueba") {
            enlaces++;
        }
    }
    var par = document.getElementsByTagName("p");
    alert(na[numeroa - 2].getAttribute("href"));
    alert("Numero de enlaces a prueba es de : " + enlaces);
    alert("El numero de enlaces de mi parrafo 3 es: " + par[2].getElementsByTagName("a").length);


}
window.onload = inicio;