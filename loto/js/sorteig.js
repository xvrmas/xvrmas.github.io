//Lògica del sorteig i resultats

import { ESTAT, desarEstat, carregarEstat } from './estat.js';
import { generarSorteig } from './generadorSorteig.js';
import { cobrarAposta, afegirPremi } from './panellJoc.js';

let i = 0;

document.addEventListener('DOMContentLoaded', () =>
{

  carregarEstat();


  if (!Array.isArray(ESTAT.apostaActual) || ESTAT.apostaActual.length !== 6)
  {
    alert('There is no valid bet. Return to the betting page.');
    window.location.href = './index.html';
    return;
  }

  

  const resultatsEl = document.getElementById('resultats');
  const apostaOrdenada = [...ESTAT.apostaActual].sort((a, b) => a - b);

  while (i < ESTAT.numSorteigs)
  {
    if (!cobrarAposta())
    {
       window.location.href = './index.html';
       return;
    }
    const numerosSorteig = generarSorteig().sort((a, b) => a - b);
    const nombreEncerts = apostaOrdenada.filter(n => numerosSorteig.includes(n)).length;

    let importPremi = 0;

    if (nombreEncerts === 6)
    {
      importPremi = ESTAT.pot > 0 ? ESTAT.pot : 100;
      ESTAT.pot = 0;
      ESTAT.gastat -= importPremi
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 5)
    {
      importPremi = 25;
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 4)
    {
      importPremi = 5;
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 3)
    {
      importPremi = 1;
      afegirPremi(importPremi);
    }
    else
    {
      ESTAT.pot += 10;
    }

    ESTAT.historial.push({
      aposta: apostaOrdenada,
      sorteig: numerosSorteig,
      encerts: nombreEncerts,
      premi: importPremi,
      data: new Date().toLocaleString()
    });

    ESTAT.apostaActual = [];
    desarEstat();
    //cobrarAposta();
    const renderBoles = (nums, encertsSet = new Set()) =>
      `<div class="balls">${nums
        .map(n => `<span class="ball ${encertsSet.has(n) ? 'acierto' : ''}">${n}</span>`)
        .join('')}</div>`;

    resultatsEl.innerHTML = `
    <p><strong>Your bet:</strong></p>
    ${renderBoles(apostaOrdenada, new Set(numerosSorteig))}
    <p><strong>Lottery:</strong></p>
    ${renderBoles(numerosSorteig)}
    <p><strong>Matches:</strong> ${nombreEncerts}</p>
    <p><strong>Win:</strong> ${ESTAT.premis}</p>
    <p><strong>Current Jackpot:</strong> ${ESTAT.pot}€</p>
  `;
    i++;
  }
});











