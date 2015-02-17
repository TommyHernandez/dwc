var videos = {
    video1: "video/machine",
    //video2: "video/destinationearth"
}

var funcionEfecto = null;

window.onload = function () {

    var video = document.getElementById("video");
    video.src = videos["video1"] + obtenerExtensionFormato();
    video.load();

    // añade un manejador al evento click de los enlaces con clase control
    var enlacesControl = document.querySelectorAll("a.control");
    for (var i = 0; i < enlacesControl.length; i++) {
        enlacesControl[i].onclick = manejoControl;
    }

    // añade un manejador click a los enlaces con clase effect
    var enlacesEfecto = document.querySelectorAll("a.effect");
    for (var i = 0; i < enlacesEfecto.length; i++) {
        enlacesEfecto[i].onclick = setEffect;
    }

    // añade un manejador click a los enlaces con classe videoSelection
    var enlacesVideo = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < enlacesVideo.length; i++) {
        enlacesVideo[i].onclick = asignarVideo;
    }

    // add click handlers to video play
    //video.onplay = processFrame;
    //video.onended = endedHandler;
    video.addEventListener("play", processFrame, false); //Cuando el vídeo comienza a verse, se llama a la función processFrame
    video.addEventListener("ended", endedHandler, false);

    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
}

function setEffect(e) {
    var id = e.target.getAttribute("id");
    if (id == "normal") {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
        funcionEfecto = null;
    } else if (id == "western") {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
        funcionEfecto = western;
    } else if (id == "noir") {
        pushUnpushButtons("noir", ["normal", "western", "scifi"]);
        funcionEfecto = noir;
    } else if (id == "scifi") {
        pushUnpushButtons("scifi", ["normal", "western", "noir"]);
        funcionEfecto = scifi;
    }
}

function asignarVideo(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    var video2 = document.getElementById("videobg");
    if (id == "video1") {
        pushUnpushButtons("video1", ["video2"]);
    } else if (id == "video2") {
       // pushUnpushButtons("video2", ["video1"]);
    }
    video.src = videos[id] + obtenerExtensionFormato();
    video.load();
    video2.load();
    video2.play();
    video.play();

    pushUnpushButtons("play", ["pause"]);
}

function obtenerExtensionFormato() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    }
}

function manejoControl(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    var video2 = document.getElementById("videobg");
    if (id == "play") {
        pushUnpushButtons("play", ["pause"]);
        if (video.ended) {
            video.load();
            video2.load()
        }
        video.play();
        video2.play();
    } else if (id == "pause") {
        pushUnpushButtons("pause", ["play"]);
        video.pause();
        video2.pause();
        
    } else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
        video.loop = !video.loop;
    } else if (id == "mute") {
        if (isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
        video.muted = !video.muted;
    }
}

//
// "ended" event handler
//
function endedHandler(e) {
    pushUnpushButtons("", ["play"]);
}

function processFrame(e) { //Cambiamos los colores para aplicar efectos
        var video = document.getElementById("video");

        if (video.paused || video.ended) {
            return;
        }

        var bufferCanvas = document.getElementById("buffer");
        var displayCanvas = document.getElementById("display");
        //El método getContext() devuelve un objeto que proporciona métodos y propiedades para dibujar en el canvas
        var buffer = bufferCanvas.getContext("2d");
        var display = displayCanvas.getContext("2d");

        buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height); //Obtenemos un frame del vídeo como imagen a dibujar en el canvas
        var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height); //copia los píxeles correspondientes al rectángulo formado por los parámetros
        var length = frame.data.length / 4;
        //Para cada frame obtenemos los valores de rgb y llamamos a la función que le dará el efecto cambiando los colores
        for (var i = 0; i < length; i++) {
            var r = frame.data[i * 4 + 0];
            var g = frame.data[i * 4 + 1];
            var b = frame.data[i * 4 + 2];
            if (funcionEfecto) {
                funcionEfecto(i, r, g, b, frame.data);
            }
        }
        display.putImageData(frame, 0, 0); //Visualizamos el frame con los colores cambiados

        setTimeout(processFrame, 0); //Ejecuta processFrame tan pronto como se pueda
        // en Chrome:
        //requestAnimationFrame(processFrame);

    }
    /*
     * bwcartoon filtro extra para un ejercicio posterior
     */
function bwcartoon(pos, r, g, b, outputData) {
    var offset = pos * 4;
    if (outputData[offset] < 120) {
        outputData[offset] = 80;
        outputData[++offset] = 80;
        outputData[++offset] = 80;
    } else {
        outputData[offset] = 255;
        outputData[++offset] = 255;
        outputData[++offset] = 255;
    }
    outputData[++offset] = 255;
    ++offset;
}

function noir(pos, r, g, b, data) {
    //alert(r+" "+g+" "+b);
    if (r <= 47 && g >= 215 && b <= 47) {
        data[pos * 4 + 3] = 0;
    }
}

function western(pos, r, g, b, data) {
    var brightness = (3 * r + 4 * g + b) >>> 3;
    data[pos * 4 + 0] = brightness + 40;
    data[pos * 4 + 1] = brightness + 20;
    data[pos * 4 + 2] = brightness - 20;
    data[pos * 4 + 3] = 255; //220;
}

function scifi(pos, r, g, b, data) {
    var offset = pos * 4;
    data[offset] = Math.round(255 - r);
    data[offset + 1] = Math.round(255 - g);
    data[offset + 2] = Math.round(255 - b);
}


function pushUnpushButtons(idToPush, idArrayToUnpush) {
    if (idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if (!theClass.indexOf("selected") >= 0) {
            theClass = theClass + " selected";
            anchor.setAttribute("class", theClass);
            var newImage = "url(images/" + idToPush + "pressed.png)";
            anchor.style.backgroundImage = newImage;
        }
    }

    for (var i = 0; i < idArrayToUnpush.length; i++) {
        anchor = document.getElementById(idArrayToUnpush[i]);
        theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >= 0) {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}

function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}