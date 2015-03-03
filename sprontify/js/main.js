function play() {
    document.getElementById("reproductor").play();
    $("#btnPause").toggleClass("oculto");
}

function pause() {
    document.getElementById("reproductor").pause();
    $("#btnPause").toggleClass("oculto");
}

function setDuration(event) {
    audioDuration.innerHTML = formatTime(audio.duration);
}

// Creamos el método formatTime para calcular el tiempo en horas,min, seg
function fillZero(str) {
    if (str.length > 2) return str;
    for (i = 0; i < (2 - str.length); i++) {
        str = "0" + str;
    }
    return str;
}

function listeners() {
    audio = document.getElementById("reproductor");
    audioDuration = document.getElementById("audioDuration");
    audioElapsed = document.getElementById("audioElapsed");
    audioLoaded = document.getElementById("audioLoaded");
    audio.addEventListener("loadedmetadata", setDuration, true);
    audio.addEventListener("timeupdate", setElapsed, true);
}

function next() {
    var next = $('#ac').next();
    if (next != undefined) {
        $("#ac").removeAttr("id");
        var src = next.attr("data-src");
        next.attr("id", "ac");
        $("#reventar").html('<audio id="reproductor" ><source src="' + src + '" type="audio/mpeg"></audio>')
        $("#progressbar").progressbar({
            value: 0
        });
        listeners();
        play();
    } else {
        alert("Za terminao primo!");
    }


}

function pre() {
    var pre = $('#ac').prev();
    if (next != "undefined") {
        $("#ac").removeAttr("id");
        var src = pre.attr("data-src");
        pre.attr("id", "ac");
        $("#reventar").html('<audio id="reproductor" ><source src="' + src + '" type="audio/mpeg"></audio>')
        $("#progressbar").progressbar({
            value: 0
        });
        listeners();
        play();
    } else {
        alert("Za terminao primo!");
    }
}

function formatTime(seconds) {
    var minute = 60,
        hour = minute * 60,
        hStr = "",
        mStr = "",
        sStr = "";
    var h = Math.floor(seconds / hour);
    hStr = fillZero(String(h));
    var m = Math.floor((seconds - (h * hour)) / minute);
    mStr = fillZero(String(m));
    var s = Math.floor((seconds - (h * hour)) - (m * minute));
    sStr = fillZero(String(s));
    return (hStr + ":" + mStr + ":" + sStr);
}

function setElapsed(event) {
    audioElapsed.innerHTML = formatTime(audio.currentTime);
    amountLoaded = (audio.currentTime / audio.duration) * 100;
    //audioLoaded.style.width = amountLoaded + 'px';
    $("#progressbar").progressbar({
        value: amountLoaded
    }); //le damos el valor actual a la barra
}
$(document).ready(function () {
    $("#progressbar").progressbar({
        value: 0
    });
    $(".sortable").sortable({
        revert: true
    });
    $(".draggable").draggable({
        connectToSortable: ".sortable",
        helper: "clone",
        revert: "invalid"
    });
    $("ul, li").disableSelection();
    /*Buscamos el primer item al cargar la pagina y le damos ID AC*/
    $("li").first().attr("id", "ac");
    var src = $("#ac").attr("data-src");;
    $("#reproductor").append('<source src="' + src + '" type="audio/mpeg">');
    //Colocamos un escuchador al reproductor para saber cuando termina la canción
    $("#reproductor").on("ended", function () {
        $("#btnPause").toggleClass("oculto"); //ocultamos el boton de pause de nuevo
        var src = $('#ac').next().attr("data-src");
        $('#ac').next().attr("id", "ac");
        $("#reventar").html('<audio id="reproductor" ><source src="' + src + '" type="audio/mpeg"></audio>')
        $("#progressbar").progressbar({
            value: 0
        });
        listeners();
        play();
    });
    //
    $("#btnPlay").on("click", play);
    $("#btnPause").on("click", pause);
    $("#btnPre").on("click", pre);
    $("#btnNext").on("click", next);
    listeners();


});