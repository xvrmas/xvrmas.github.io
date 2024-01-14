

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

// Línea 1: agafa tots el elements de la clase boto i els guarda a la variable botons
// Línea 2: Itera sobre tots els elements que em guardat de la clase 'boto'.
// Línea 3: Remou la clase 'boto-seleccionat' de css de cada botó.
// Línea 4: Afegeix la clase 'boto-seleccionat' al botó que em pasat com  argument.

function cambiarColor(botoSeleccionat) {
    let botons = document.querySelectorAll('.boto');
    botons.forEach(boton => {
        boton.classList.remove('boto-seleccionat');
    });
    botoSeleccionat.classList.add('boto-seleccionat');
}

// guardem a la variable "imatgesAmpliables" la clase "imatge-ampliable"
var imatgesAmpliables = document.querySelectorAll('.imagte-ampliable');

// Afegir un event de clic a cada imatgen
imatgesAmpliables.forEach(function (imatge) {
    imatge.addEventListener('click', function () {
        this.classList.toggle('ampliada');
    });
});

function    obrirEnllas()
{
    let url = "./download/GENERIX.pdf"
    window.open(url, "_blank");
}
// Asegúrate de que este código esté en tu archivo main.js

// Obtén una referencia al campo de entrada y las secciones
const buscadorInput = document.getElementById('buscador');
const secciones = document.querySelectorAll('.boto');

// Agrega un evento de entrada al campo de búsqueda
buscadorInput.addEventListener('input', function() {
    // Obtén el término de búsqueda del campo de entrada
    const terminoBusqueda = buscadorInput.value.toLowerCase();

    // Itera sobre las secciones y muestra u oculta según el término de búsqueda
    secciones.forEach(seccion => {
        const contenidoSeccion = seccion.textContent.toLowerCase();
        if (contenidoSeccion.includes(terminoBusqueda)) {
            seccion.style.display = 'inline';
        } else {
            seccion.style.display = 'none';
        }
    });
});




