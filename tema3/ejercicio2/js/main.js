function main(){
   var t1 = document.getElementById('titulo1');
    t1.onclick = function (){
        var invis = document.getElementById('Hardware');
        invis.classList.toggle('invisible');
    }
    
}

window.onload = main;