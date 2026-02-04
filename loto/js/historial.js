//Render de l’historial

import { ESTAT, carregarEstat } from './estat.js';



document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  ESTAT.historial.sort((a, b) => b.encerts - a.encerts);

  const netejaHistorial = document.getElementById('neteja-historial');
  netejaHistorial.addEventListener('click', async () =>
  {
    const result = await Swal.fire({
      title: 'Are you sure',
      text: 'Do you want to clear your history?, Earnings, balance, and all history will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) =>
    {
      if (result.isConfirmed)
      {
        localStorage.clear();
        Swal.fire({
          title: 'Deleted!',
          text: 'All deleted',
          icon: 'success',
          timer: 1500,
          timerProgessBar: true,
          showConfirmButton: false
        }).then(() =>
        {
          location.reload();
        })
      }
    })
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
    tdPremi.textContent = `${h.premis}`;
    if (h.premis !== 0)
    {
      tdPremi.classList.add('guanyador');
    }
    fila.innerHTML = `
      <td data-label="Date" class="data">${h.data}</td>
      <td data-label="Way" class="way">${h.origen}</td>
      <td data-label="Your bet" class="aposta">${h.aposta.join('-')}</td>
      <td data-label="Winning numbers" class="resultat">${h.sorteig.join('-')}</td>
      <td data-label="Matches" class="coincidencies">${h.encerts}</td>
      <td data-label="Bonus player" class="bonus">${h.bonusUsuari}</td>
      <td data-label="Bonus Lottery" class="bonus">${h.bonus}</td>
    `;
    fila.appendChild(tdPremi);
    historialEl.appendChild(fila);
  }
});




