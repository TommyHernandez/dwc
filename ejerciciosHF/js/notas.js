function addStickyToDOM(value, key) {
    var notas = document.getElementById("notas");
    var nota = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.setAttribute("id", key);
    span.textContent = value;
    nota.appendChild(span);
    nota.addEventListener('click', ejecutar, false);
    notas.appendChild(nota);
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var key = "nota_" + localStorage.length;
    localStorage.setItem(key, value);
    addStickyToDOM(value, key);
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

function init() {
    if (!Modernizr.localstorage) {
        alert('TACO');
        var span =document.getElementById('error');
        span.classList.add('rojo');
        
    } else {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "nota") {
                var value = localStorage.getItem(key);
                addStickyToDOM(value, key);
            }
        }
        var button = document.getElementById("add_button");
          
        button.onclick = createSticky;
    }
}
window.onload = init;