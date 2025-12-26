//Render de l’historial

import { ESTAT, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  const historialEl = document.getElementById('historial');
  console.log('iteracions-> ', ESTAT.numSorteigs);

  ESTAT.historial.forEach(h =>
  {
    const li = document.createElement('li');
    li.textContent =
      `${h.data} || Your bet: ${h.aposta.join(', ')} - Winning numbers: ${h.sorteig.join(', ')} → ${h.encerts} Matches (${h.premi}€)`;
    historialEl.appendChild(li);
  });
});


