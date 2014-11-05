function addStickyToDOM(value, key, color) {
    var notas = document.getElementById("notas");
    var nota = document.createElement("li");
    var span = document.createElement("span");
   if (color == "verde") {
        span.setAttribute("class", "verde");
    } else if (color == "azul") {
        span.setAttribute("class", "azul");
    } else if (color == "amarillo") {
        span.setAttribute("class", "amarillo");
    }
    span.setAttribute("id", key);
    span.textContent = value;
    span.addEventListener('click', ejecutar, false);
    nota.appendChild(span);
    notas.appendChild(nota);
    
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var color = document.getElementById("color").value;
    var objeto =  { 'valor' : value, 'color' : color };
    var key = "nota_" + localStorage.length;
    localStorage.setItem(key, JSON.stringify(objeto));
    addStickyToDOM(value, key, color);
}

function ejecutar(evt) {
    if (confirm("Se eliminará esta nota " + this.id)) {
        if (confirm("Está de acuerdo")) {
            localStorage.removeItem(this.id);
            document.getElementById(this.id).parentNode.innerHTML = "";

        } else {}
        return true;
    } else {
        evt.preventDefault();
    }
}

function borrador() {
    var notas = document.getElementsByTagName("span");
    for (var a = 0; a < notas.length; a++) {
        notas[a].addEventListener('click', ejecutar, false);
    }
}

function mostrar (e){
    var key= e.key;
     if (key.substring(0, 4) == "nota") {
            var objeto = JSON.parse(localStorage.getItem(key));
            var value = objeto.valor;
            var color= objeto.color; 
            addStickyToDOM(value, key,color);
        }
    
}

function pressed(e) {
    if (e.keyCode == 13) {
        createSticky();
    }
}

function init() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substring(0, 4) == "nota") {
            var objeto = JSON.parse(localStorage.getItem(key));
            var value = objeto.valor;
            var color= objeto.color; 
            addStickyToDOM(value, key,color);
        }
    }
    var button = document.getElementById("add_button");
    var campo = document.getElementById('note_text');
    campo.onkeypress = pressed;
    button.onclick = createSticky;
    window.addEventListener("storage", mostrar, false);

}
window.onload = init;