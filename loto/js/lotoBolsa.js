// js/lotoBolsa.js
import { STATE, save, load } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  const saldoDisplay = document.getElementById('saldo-display');
  const boteDisplay  = document.getElementById('bote-display');
  const botonIngreso = document.getElementById('boto-loto-bolsa');

  function actualizarDisplays() {
    if (saldoDisplay) saldoDisplay.textContent = `Funds: ${STATE.saldo}€`;
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
    if (saldoDisplay) saldoDisplay.textContent = `Funds: ${STATE.saldo}€`;
    if (boteDisplay)  boteDisplay.textContent  = `Pot: ${STATE.bote}€`;
    return true;
  } else {
    alert('You do not have enough balance');
    return false;
  }
}

export function agregarPremio(premio) {
  STATE.saldo += premio;
  save();
  const saldoDisplay = document.getElementById('saldo-display');
  if (saldoDisplay) saldoDisplay.textContent = `Funds: ${STATE.saldo}€`;
}





