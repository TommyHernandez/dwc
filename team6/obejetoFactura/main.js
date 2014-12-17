/*Objetos*/
var objcliente = {
    nombre: "",
    dni: "",
    constr: function (nombre, dni) {
        this.nombre = nombre;
        this.dni = dni;
    }
};
//
var objempresa = {
    nombre: "",
    cif: "",
    constr: function (nombre, cif) {
        this.nombre = nombre;
        this.cif = cif;
    }
};

var hoy = (new Date()).toUTCString();

//Objetos a utilizar
//objeto Factura
var objetoFactura = {
    iva: 1.21,
    empresa: "",
    cliente: "",
    fecha: "",
    total: 0,
    lista: [],

    getTotal: function () {
        var total = this.total;
        return total;
    },

    constructor: function (empresa, cliente, lista, fecha) {
        this.empresa = empresa;
        this.cliente = cliente;
        this.lista = lista;
        this.fecha = fecha;
        for (var i = 0; i < this.lista.length; i++) {
            this.total = this.total + lista[i].precio;
        }
    }

};
//fin objeto factura

/*
Funciones que se iran utilizando
*/
function colocarTabla(objeto) {
    //creamos nuestos elementos para el dom.
    var newtr = document.createElement('tr');
    var tdcli = document.createElement('td');
    var tdemp = document.createElement('td');
    var tdprod = document.createElement('td');
    var tdtotal = document.createElement('td');
    //elementos para los productos
    var ul = document.createElement('ul');
    var nwli = document.createElement('li');
    //capturamos la tabla de nuestro index
    var tabla = document.getElementById('tabla-facturas');
    //sacamos la lista
    var lista = objeto.lista;
    //extraemos los datos del objeto Factura.
    tdcli.textContent = objeto.cliente.nombre;
    tdemp.textContent = objeto.empresa.nombre;
    for (var a = 0; a < objeto.lista.length; a++) {
        var newli = document.createElement('li');
        newli.textContent = objeto.lista[a].precio;
        ul.appendChild(newli);
    }

    tdprod.appendChild(ul);
    tdtotal.textContent = objeto.getTotal();
    newtr.appendChild(tdcli);
    newtr.appendChild(tdemp);
    newtr.appendChild(tdprod);
    newtr.appendChild(tdtotal);
    tabla.appendChild(newtr);

}
//manejadores
function manejadorEmresa() {
    var nombreEmpresa = document.getElementById('nombreEmpresa');
    var cif = document.getElementById('cif');
    if (localStorage.getItem('Empresa')) {
        var empresa = JSON.parse(localStorage.getItem('Empresa'));
        nombreEmpresa.value = empresa.nombre;
        cif.value = empresa.cif;

    } else {
        alert("No hay empresa asignada");
    }
    var fomrEm = document.getElementById('formEmpresa');
    fomrEm.classList.toggle('oculto');
}

function manejadorSendEmprsa() {
    var nombreEmpresa = document.getElementById('nombreEmpresa').value;
    var cif = document.getElementById('cif').value;
    var objeto = Object.create(objempresa);
    objeto.constr(nombreEmpresa, cif);
    localStorage.setItem("Empresa", JSON.stringify(objeto));
}
/*
En este manejador recuperamos la empresa que debe de estar en localStorage, comprobamos qe elementos estan check y creamos el objeto factura
*/
function manejadorFactura() {
    var nombreCli = document.getElementById('cliente');
    var dniCli = document.getElementById('dni-cliente');
    var elemento = document.getElementById('elem');
    var elemento1 = document.getElementById('elem1');
    var elemento2 = document.getElementById('elem2');
    var nuevaFactura = Object.create(objetoFactura);
    var empresa = JSON.parse(localStorage.Empresa);
    var lista = [];
    if (elemento.checked) {
        lista.push({
            precio: elemento.value
        });
    } else if (elemento1.checked) {
        lista.push({
            precio: elemento1.value
        });
    } else if (elemento2.checked) {
        lista.push({
            precio: elemento2.value
        });
    }
    nuevaFactura.constructor(empresa, cliente, lista, hoy);
    localStorage.setItem("factura"+localStorage.length+hoy, JSON.stringify(nuevaFactura));
}

//Funcion principal
function main() {
    //Capturamos elementos del DOM
    var botonFactura = document.getElementById("botonFactura");
    var botonEmpre = document.getElementById('ediEmp');
    var botonfactura = document.getElementById('botonfactura');
    var botonSendEmpresa = document.getElementById('send');
    botonEmpre.addEventListener('click', manejadorEmresa);
    botonfactura.addEventListener('click', manejadorFactura);
    botonSendEmpresa.addEventListener('click', manejadorSendEmprsa);
}
window.addEventListener('load', main);