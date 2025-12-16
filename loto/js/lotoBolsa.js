import { STATE, save, load } from './state.js';

load();

const saldoDisplay = document.getElementById('saldo-display');
const boteDisplay = document.getElementById('bote-display');

function actualizarDisplays() {
  saldoDisplay.textContent = `Saldo: ${STATE.saldo}€`;
  boteDisplay.textContent = `Bote: ${STATE.bote}€`;
}

actualizarDisplays();

document.getElementById('boto-loto-bolsa').addEventListener('click', () => {
  const ingreso = Number(prompt('¿Cuánto quieres ingresar?'));
  if (!isNaN(ingreso) && ingreso > 0) {
    STATE.saldo += ingreso;
    save();
    actualizarDisplays();
  } else {
    alert('Cantidad inválida');
  }
});

export function descontarApuesta() {
  if (STATE.saldo >= 1) {
    STATE.saldo -= 1;
    save();
    actualizarDisplays();
    return true;
  } else {
    alert('No tienes saldo suficiente');
    return false;
  }
}

export function agregarPremio(premio) {
  STATE.saldo += premio;
  save();
  actualizarDisplays();
}
