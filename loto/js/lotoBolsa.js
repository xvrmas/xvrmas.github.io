// js/lotoBolsa.js
import { STATE, save, load } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  load();

  const saldoDisplay = document.getElementById('saldo-display');
  const boteDisplay  = document.getElementById('bote-display');
  const botonIngreso = document.getElementById('boto-loto-bolsa');

  function actualizarDisplays() {
    if (saldoDisplay) saldoDisplay.textContent = `Saldo: ${STATE.saldo}€`;
    if (boteDisplay)  boteDisplay.textContent  = `Bote: ${STATE.bote}€`;
  }

  actualizarDisplays();

  // Solo si el botón existe (index.html), conectamos el ingreso
  if (botonIngreso) {
    botonIngreso.addEventListener('click', () => {
      const ingreso = Number(prompt('¿Cuánto quieres ingresar?'));
      if (!isNaN(ingreso) && ingreso > 0) {
        STATE.saldo += ingreso;
        save();
        actualizarDisplays();
      } else {
        alert('Cantidad inválida');
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
    if (saldoDisplay) saldoDisplay.textContent = `Saldo: ${STATE.saldo}€`;
    if (boteDisplay)  boteDisplay.textContent  = `Bote: ${STATE.bote}€`;
    return true;
  } else {
    alert('No tienes saldo suficiente');
    return false;
  }
}

export function agregarPremio(premio) {
  STATE.saldo += premio;
  save();
  const saldoDisplay = document.getElementById('saldo-display');
  if (saldoDisplay) saldoDisplay.textContent = `Saldo: ${STATE.saldo}€`;
}





