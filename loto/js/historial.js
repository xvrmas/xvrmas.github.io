import { STATE, load } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  const ul = document.getElementById('lista');
  STATE.historial.forEach(h => {
    const li = document.createElement('li');
    li.textContent =
      `${h.fecha} || Your bet: ${h.apuesta.join(', ')} - Winning numbers: ${h.sorteo}→ ${h.aciertos} Matches (${h.premio}€)`;
    ul.appendChild(li);
  });
});


