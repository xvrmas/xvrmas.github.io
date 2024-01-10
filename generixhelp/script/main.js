

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
function alerta(msg) {
    alert(msg);
}

function cambiarColor(botonSeleccionado) {
    let botones = document.querySelectorAll('.boton');
    botones.forEach(boton => {
        boton.classList.remove('boton-seleccionado');
    });
    botonSeleccionado.classList.add('boton-seleccionado');
}
// Obtener todas las imágenes con la clase "imagen-ampliable"
var imagenesAmpliables = document.querySelectorAll('.imagen-ampliable');

// Agregar un evento de clic a cada imagen
imagenesAmpliables.forEach(function(imagen) {
    imagen.addEventListener('click', function() {
        this.classList.toggle('ampliada');
    });
});




