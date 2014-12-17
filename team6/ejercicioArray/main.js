/*
 *
 */
function main() {
    var letras = [];
    letras[0] = "a";
    letras[7] = "b";
    letras[10] = "d";

    Array.prototype.ultimo = ultimo;
    Array.prototype.primero = primero;
    Array.prototype.vaciar = vaciar;
    Array.prototype.compacta = compacta;
    alert(letras.ultimo());
    alert(letras.primero());
    letras.compacta();
    alert(letras.vaciar);
}

function ultimo() {
    return this[this.length - 1];
}

function primero() {
    for (var a = 0; a < this.length; a++) {
        if (this[a] != undefined) {
            return this[a];
        }
    }
}

function compacta() {
    for (var a = 0; a < this.length; a++) {
        if (!this[a]) {
            this.splice(a, 1);
            a--;
        }
    }
}

function vaciar() {
    this.length = 0;
}
window.addEventListener('load', main);