function addStickyToDOM(value) {
    var notas = document.getElementById("notas");
    var nota = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "sticky");
    span.textContent = value;
    nota.appendChild(span);
    notas.appendChild(nota);
}

function createSticky() {
    var value = document.getElementById("note_text").value;
    var key = "nota_" + localStorage.length;
    localStorage.setItem(key, value);
    addStickyToDOM(value);
}

function init() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.substring(0, 4) == "nota") {
            var value = localStorage.getItem(key);
            addStickyToDOM(value);

        }
    }
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
}
window.onload = init;