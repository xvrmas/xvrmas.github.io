

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
// function alerta(msg) {
//     alert(msg);
// }

// Línea 1: agafa tots el elements de la clase boto i els guarda a la variable botons
// Línea 2: Itera sobre tots els elements que em guardat de la clase 'boto'.
// Línea 3: Remou la clase 'boto-seleccionat' de css de cada botó.
// Línea 4: Afegeix la clase 'boto-seleccionat' al botó que hem pasat com  argument.

function cambiarColor(botoSeleccionat) {
    let botons = document.querySelectorAll('.boto');
    botons.forEach(boton => {
        boton.classList.remove('boto-seleccionat');
    });
    botoSeleccionat.classList.add('boto-seleccionat');
}

function mostrarTexte(boton) {
    var texteBoto = boton.textContent;
    document.getElementById('texteSeleccionat').textContent = texteBoto;
}

// guardem a la variable "imatgesAmpliables" la clase "imatge-ampliable"
var imatgesAmpliables = document.querySelectorAll('.imagte-ampliable');

// Afegir un event de clic a cada imatge
imatgesAmpliables.forEach(function (imatge) {
    imatge.addEventListener('click', function () {
        this.classList.toggle('ampliada');
    });
});
/*
function obrirEnllas() {
    let url = "./download/GENERIX.pdf"
    window.open(url, "_blank");
}
*/
function recargarPagina() {
    location.reload();
}

const buscadorInput = document.getElementById('buscador');
const seccions = document.querySelectorAll('.boto');

buscadorInput.addEventListener('input', function () {
    const termeBusqueda = buscadorInput.value.toLowerCase();
    seccions.forEach(seccion => {
        const contingutSeccion = seccion.textContent.toLowerCase();
        if (contingutSeccion.includes(termeBusqueda)) {
            seccion.style.display = 'inline';
        } else {
            seccion.style.display = 'none';
        }
    });
});
function mostrarModal(id) {
    var contenido = document.getElementById(id).innerHTML;


    var modal = document.createElement('div');
    modal.classList.add('modal');


    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.innerHTML = contenido;

    var closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('close');
    closeButton.onclick = function () {
        modal.style.display = 'none';
    };

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);


    document.body.appendChild(modal);
}





