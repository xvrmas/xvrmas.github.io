
function mostrar(obj) {
    let diva = document.getElementById(obj);
    diva.style.display = '';
}

function reset() {
    let divs = document.getElementsByClassName('divi');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
}
function    alerta(msg)
{
    alert(msg);
}
let botones = document.querySelectorAll('.boton');

function cambiarColor(botonSeleccionado) {
    botones.forEach(boton => {
        boton.classList.remove('boton-seleccionado');
    });
    botonSeleccionado.classList.add('boton-seleccionado');
}



