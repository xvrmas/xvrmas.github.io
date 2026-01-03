//Render de l’historial

import { ESTAT, carregarEstat } from './estat.js';



document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  ESTAT.historial.sort((a, b) => b.encerts - a.encerts);

  const netejaHistorial = document.getElementById('neteja-historial');
  netejaHistorial.addEventListener('click', () =>
  {
    let confirmaNeteja = confirm('Do you want to clear your history?, Earnings, balance, and all history will be deleted.');
    if (confirmaNeteja === true)
    {
      localStorage.clear();
      location.reload();
    }
    else
    {
      return;
    }

  })

  for (let item of ESTAT.historial)
  {
    pinta(item);
  }

  function pinta(h)
  {
    const historialEl = document.querySelector('.taula-dinamica tbody');
    const fila = document.createElement('tr');
    const tdPremi = document.createElement('td');
    tdPremi.classList.add('premi');
    tdPremi.textContent = `${h.premi}`;
    if (h.premi !== 0)
    {
      tdPremi.classList.add('guanyador');
    }
    fila.innerHTML = `
    <td class="data">${h.data}</td>
    <td class="aposta">${h.aposta.join('-')}</td>
    <td class="resultat">${h.sorteig.join('-')}</td>
    <td class="coincidencies">${h.encerts}</td>
  `;
    fila.appendChild(tdPremi);
    historialEl.appendChild(fila);
  }
});




