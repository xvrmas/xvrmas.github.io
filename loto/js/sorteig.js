//Lògica del sorteig i resultats

import { ESTAT, desarEstat, carregarEstat } from './estat.js';
import { generarSorteig } from './generadorSorteig.js';
import { cobrarAposta, afegirPremi } from './panellJoc.js';

let i = 0;
let premiRonda = 0;


document.addEventListener('DOMContentLoaded', () =>
{

  carregarEstat();


  if (!Array.isArray(ESTAT.apostaActual) || ESTAT.apostaActual.length !== 6)
  {
    alert('There is no valid bet. Return to the betting page.');
    window.location.href = './index.html';
    return;
  }



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
      importPremi = ESTAT.pot > 0 ? ESTAT.pot : 15000000;
      ESTAT.pot = 0;
      ESTAT.gastat -= importPremi
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 5)
    {
      importPremi = 2045.19;
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 4)
    {
      importPremi = 51.81;
      afegirPremi(importPremi);
    }
    else if (nombreEncerts === 3)
    {
      importPremi = 8.37;
      afegirPremi(importPremi);
    }
    else
    {
      ESTAT.pot += 10;
    }
    premiRonda += importPremi;
    ESTAT.historial.push({
      aposta: apostaOrdenada,
      sorteig: numerosSorteig,
      encerts: nombreEncerts,
      premis: importPremi,
      data: new Date().toLocaleString()
    });


    ESTAT.apostaActual = [];
    desarEstat();
    const resultatsEl = document.getElementById('resultats');
    const resultatsDiv = document.createElement('div');

    const renderBoles = (nums, encertsSet = new Set()) =>
      `<div class="balls">${nums.map(n => `<span class="ball ${encertsSet.has(n) ? 'acierto' : ''}">${n}</span>`).join('')}</div>`;

    resultatsDiv.innerHTML = `
    <div>
     <p>Draw:<strong> ${i + 1}</strong></p>
     <p>Your bet:</p>
     ${renderBoles(apostaOrdenada, new Set(numerosSorteig))}
     <p>Lottery:</p>
     ${renderBoles(numerosSorteig)}
     <p>Matches: ${nombreEncerts}</p>
     <p>Win: ${importPremi}</p>
    <h1></h1>
    </div>
     `;
    resultatsEl.appendChild(resultatsDiv);
    i++;
  }
  ESTAT.numSorteigs = 1;
  desarEstat();
  console.log('sorteig', ESTAT.numSorteigs)
});











