//Render de l’historial

import { ESTAT, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  for (let item of ESTAT.historial)
  {
    pinta(item);
  }
  
  function pinta(h)
  {
    const historialEl = document.querySelector('.taula-dinamica tbody');
    const fila = document.createElement('tr');

    fila.innerHTML = `
    <td class="data">${h.data}</td>
    <td class="aposta">${h.aposta.join('-')}</td>
    <td class="resultat">${h.sorteig.join('-')}</td>
    <td class="coincidencies">${h.encerts}</td>
    <td class="premi">${h.premi}€</td>
  `;
    historialEl.appendChild(fila);
    console.log(h.sorteig);

  };
});

/* ESTAT.historial.forEach(h =>
 {
   const li = document.createElement('li');
   li.textContent =
     `${h.data} || Your bet: ${h.aposta.join(', ')} - Winning numbers: ${h.sorteig.join(', ')} → ${h.encerts} Matches (${h.premi}€)`;
   historialEl.appendChild(li);
 });
*/


