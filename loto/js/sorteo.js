import { STATE, save, load } from './state.js';
import { auto } from './automatica.js';
import { descontarApuesta, agregarPremio } from './lotoBolsa.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  if (!STATE.apuesta || STATE.apuesta.length !== 6) {
    alert('No hay apuesta válida. Vuelve a la página de apuestas.');
    window.location.href = './index.html';
    return;
  }

  if (!descontarApuesta()) {
    alert('No tienes saldo suficiente.');
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
    premio = 25;
    agregarPremio(premio);
  } else if (aciertos === 4) {
    premio = 5;
    agregarPremio(premio);
  } else {
    STATE.bote += 2;
  }

  STATE.historial.push({
    apuesta: apuestaJugador,
    sorteo,
    aciertos,
    premio,
    fecha: new Date().toLocaleString()
  });

  STATE.apuesta = [];
  save();

  // Animación de sorteo
  const loading = document.getElementById('loading');
  let current = 0;
  const interval = setInterval(() => {
    loading.textContent = '🎲 Sorteando ' + '.'.repeat(current % 4);
    current++;
    if (current >= 20) { // duración animación
      clearInterval(interval);
      mostrarResultadoFinal();
    }
  }, 100);

  function mostrarResultadoFinal() {
    // Reemplazar todo el contenido de 'res' por el resultado final
    res.innerHTML = `
      <p><strong>Tu apuesta:</strong></p>
      <div class="balls">
        ${apuestaJugador.map(n => `<span class="ball ${sorteo.includes(n)?'acierto':''}">${n}</span>`).join('')}
      </div>

      <p><strong>Sorteo:</strong></p>
      <div class="balls">
        ${sorteo.map(n => `<span class="ball">${n}</span>`).join('')}
      </div>

      <p><strong>Aciertos:</strong> ${aciertos}</p>
      <p><strong>Premio:</strong> ${premio}€</p>
      <p><strong>Bote actual:</strong> ${STATE.bote}€</p>
    `;
  }
});





