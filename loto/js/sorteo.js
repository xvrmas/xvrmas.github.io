// js/sorteo.js
import { STATE, save, load } from './state.js';
import { auto } from './automatica.js';
import { descontarApuesta, agregarPremio } from './lotoBolsa.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  if (!Array.isArray(STATE.apuesta) || STATE.apuesta.length !== 6) {
    alert('There is no valid bet. Return to the betting page.');
    window.location.href = './index.html';
    return;
  }

  if (!descontarApuesta()) {
    window.location.href = './index.html';
    return;
  }

  const res = document.getElementById('res');
  if (!res) return;

  const apuestaJugador = [...STATE.apuesta].sort((a, b) => a - b);
  const sorteo = auto().sort((a, b) => a - b);
  const aciertos = apuestaJugador.filter(n => sorteo.includes(n)).length;

  let premio = 0;
  if (aciertos === 6) {
    premio = STATE.bote > 0 ? STATE.bote : 100;
    agregarPremio(premio);
    STATE.bote = 0;
  } else if (aciertos === 5) {
    premio = 25; agregarPremio(premio);
  } else if (aciertos === 4) {
    premio = 5;  agregarPremio(premio);
  } else if (aciertos === 1){
    premio = 1; agregarPremio(premio);
  }  
  else {
    STATE.bote += 10;
  }

  STATE.historial.push({
    apuesta: apuestaJugador,
    sorteo,
    aciertos,
    premio,
    fecha: new Date().toLocaleString()
  });
  // Limpiar apuesta y guardar ya
  STATE.apuesta = [];
  save();

  const renderBalls = (nums, highlightSet = new Set()) =>
    `<div class="balls">${nums
      .map(n => `<span class="ball ${highlightSet.has(n) ? 'acierto' : ''}">${n}</span>`)
      .join('')}</div>`;

  res.innerHTML = `
    <p><strong>Your bet:</strong></p>
    ${renderBalls(apuestaJugador, new Set(sorteo))}
    <p><strong>Lottery:</strong></p>
    ${renderBalls(sorteo)}
    <p><strong>Matches:</strong> ${aciertos}</p>
    <p><strong>Win:</strong> ${STATE.ganancias}</p>
    <p><strong>Current Jackpot:</strong> ${STATE.bote}€</p>
  `;
});










