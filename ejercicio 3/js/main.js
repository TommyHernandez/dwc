function principal (){
    var parrafo1 = document.getElementById('parrafo1');
    var parrafo2 = document.getElementById('parrafo2');
    var getbody = document.getElementsByTagName('body');
    //Al final de la pagina
    var parrafonew1 = document.createElement('p');
    var parrafonew2 = document.createElement('p');
    parrafonew1.innerText = "En el primer parrafo hay: " + parrafo1.innerText;
    parrafonew2.innerText = "En el segundo parrafo hay: " + parrafo2.innerText;
    document.body.appendChild(parrafonew1);
    document.body.appendChild(parrafonew2);
    //
    
    
  document.getElementById("bt1").onclick = function () {
        parrafo1.innerText = "Parrafo uno modificado";
        
    }//Creando una funciona anonima e insertando en el mismo momento en que capturamos
    var bt2 = document.getElementById("bt2");
    bt2.onclick = function(){
        parrafo2.innerHTML = "<b>Lista!</b><ul><li>Elemento en la lista</li><li> Otro elemendo NO</li></ul>";
        
    }//aplicando  al evento una funcion anonima    
    var bt3 = document.getElementById("bt3");
       bt3.onclick = function(){
        parrafo2.innerText = "Inner text por segunda vez a otro parrafo";
    }//igual que el de antes
    var bt4 = document.getElementById("bt4");
       bt4.onclick = function(){
        parrafo2.textContent = "Parrafo con textconent";
    }//ejemplo similar al primero
    document.getElementById("bt5").onclick = function (){
        parrafo2.firstChild.textContent  = "Modificamos el primero hijo con text content";
        
        
    }
   
    

    
    
    
}

window.onload = principal;