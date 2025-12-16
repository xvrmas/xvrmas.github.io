import { STATE, load } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  const ul = document.getElementById('lista');
  STATE.historial.forEach(h => {
    const li = document.createElement('li');
    li.textContent =
      `${h.fecha} | ${h.apuesta.join(', ')} → ${h.aciertos} aciertos (${h.premio}€)`;
    ul.appendChild(li);
  });
});


