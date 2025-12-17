// js/lotoBolsa.js
import { STATE, save, load } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  load();
  const saldoDisplay = document.getElementById('saldo-display');
  const boteDisplay  = document.getElementById('bote-display');
  const saldoGanancias = document.getElementById('ganancias-display');
  const botonIngreso = document.getElementById('boto-loto-bolsa');

  function actualizarDisplays() {
    if (saldoDisplay) saldoDisplay.textContent = `Balance: ${STATE.saldo}€`;
    if (saldoGanancias) saldoGanancias.textContent = `Win: ${STATE.ganancias}`;
    if (boteDisplay)  boteDisplay.textContent  = `Pot: ${STATE.bote}€`;

  }

  actualizarDisplays();

  // Solo si el botón existe (index.html), conectamos el ingreso
  if (botonIngreso) {
    botonIngreso.addEventListener('click', () => {
      const ingreso = Number(prompt('How much money do you want to add?'));
      if (!isNaN(ingreso) && ingreso > 0) {
        STATE.saldo += ingreso;
        save();
        actualizarDisplays();
      } else {
        alert('Invalid amount');
      }
    });
  }
});

export function descontarApuesta() {
  if (STATE.saldo >= 1) {
    STATE.saldo -= 1;
    save();
    // No asumimos que hay displays en todas las páginas
    const saldoDisplay = document.getElementById('saldo-display');
    const boteDisplay  = document.getElementById('bote-display');
    const saldoGanancias = document.getElementById('ganancias-display') ;

    if (saldoDisplay) saldoDisplay.textContent = `Funds: ${STATE.saldo}€`;
    if (boteDisplay)  boteDisplay.textContent  = `Pot: ${STATE.bote}€`;
    if (saldoGanancias)  saldoGanancias.textContent  = `Win: ${STATE.ganancias}€`;
    return true;
  } else {
    alert('You have insufficient funds');
    return false;
  }
}

export function agregarPremio(premio) {
  STATE.ganancias += premio;
  save();
  const gananciasDisplay = document.getElementById('ganancias-display');
  if (gananciasDisplay) gananciasDisplay.textContent = `Funds: ${STATE.ganancias}€`;
}





