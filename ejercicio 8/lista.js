function inicio() {
    var na = document.getElementsByTagName("a");
    var numeroa = na.length;
    var enlaces = 0;
    var miul = document.getElementsByTagName("ul");
    var newli = document.createElement("li");
    newli.innerText = "El numero de enlaces es: " + numeroa;
    miul.appendChild(newli);
    
    for (var a = 0; a < numeroa; a++) { 
        if (na[a].getAttribute("href") == "http://prueba") {
            enlaces++;
        }
    }
    var par = document.getElementsByTagName("p");



}
window.onload = inicio;