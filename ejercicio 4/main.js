function principal() {
    var bt = document.getElementById('boton');
    var nuevoB = document.createElement('b');
    nuevob.contains = "Elemento insertado";
    bt.addEventListener = insertarAfter('ref', nuevoB);

}

function insertarAfter(var ref,
    var elemento) {
    var referenciado = document.getElementById('ref');
    var hermano = referenciado.nextElementSibling;
    if (hermano != null) {
    hermano.insertBefore(elemento);
    }
}

window.onload = principal;