function main() {
    var imagenh = [],
        imagens = [];
    imagenh[0] = "imagenes/motog.jpg";
    imagenh[1] = "imagenes/nexus";
    imagenh[2] = "imagenes/motog.jpg";
    //Ahora introducimos la de software
    imagens[0] = "imagenes/gimp.png";
    var t1 = document.getElementById('titulo1'),
        t2 = document.getElementById('titulo2');
    var lista = document.getElementsByTagName("li");
   


    t1.addEventListener("click", function () {
        var invis = document.getElementById('lista1');
        invis.classList.toggle('oculto');


    });
    t2.addEventListener("click", function () {
        var invis = document.getElementById('lista2');
        invis.classList.toggle('oculto');

    });

}



window.onload = main;