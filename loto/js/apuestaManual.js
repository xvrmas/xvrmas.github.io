import { STATE, save } from './state.js';

let seleccion = [];
const contenedor = document.getElementById('numeros');

for (let i = 1; i <= 49; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  btn.classList.add('numero-btn');

  btn.addEventListener('click', () => {
    if (seleccion.includes(i)) {
      seleccion = seleccion.filter(n => n !== i);
      btn.classList.remove('seleccionado');
    } else if (seleccion.length < 6) {
      seleccion.push(i);
      btn.classList.add('seleccionado');
    }

    document.getElementById('numeros-seleccionados').textContent =
      `Seleccionados: ${seleccion.join(', ')}`;

    contenedor.querySelectorAll('button').forEach(b => {
      if (!seleccion.includes(parseInt(b.textContent))) {
        b.disabled = seleccion.length >= 6;
      }
    });
  });

  contenedor.appendChild(btn);
}

document.getElementById('boto-pronostic').addEventListener('click', () => {
  if (seleccion.length !== 6) {
    alert('Debes seleccionar exactamente 6 números');
    return;
  }

  STATE.apuesta = [...seleccion];
  save();
  window.location.href = './resultado.html';
});




