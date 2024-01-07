/*
function hola(num)
{
    document.getElementById("obj1").innerText = num;
}function hola2(num)
{
    document.getElementById("obj2").innerText = num;
}function hola3(num)
{
    document.getElementById("obj3").innerText = num;
}function hola4(num)
{
    document.getElementById("obj4").innerText = num;
}*/

function mostrar1() {
    div = document.getElementById('obj1');
    div.style.display = '';
}
function mostrar2() {
    div = document.getElementById('obj2');
    div.style.display = '';
} function mostrar3() {
    div = document.getElementById('obj3');
    div.style.display = '';
} function mostrar4() {
    div = document.getElementById('obj4');
    div.style.display = '';
}
function alerta() {
    var divs = document.getElementsByClassName('divi');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.display = 'none';
    }
}
let botones = document.querySelectorAll('.boton');

function cambiarColor(botonSeleccionado) {
  // Remover la clase 'boton-seleccionado' de todos los botones
  botones.forEach(boton => {
    boton.classList.remove('boton-seleccionado');
  });

  // Agregar la clase 'boton-seleccionado' al botón seleccionado
  botonSeleccionado.classList.add('boton-seleccionado');
}

