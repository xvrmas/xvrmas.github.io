
function mostrar(obj) {
    div = document.getElementById(obj);
    div.style.display = '';
}

function reset() {
    var divs = document.getElementsByClassName('divi');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
}

let botones = document.querySelectorAll('.boton');

function cambiarColor(botonSeleccionado) {
    botones.forEach(boton => {
        boton.classList.remove('boton-seleccionado');
    });

    botonSeleccionado.classList.add('boton-seleccionado');
}



