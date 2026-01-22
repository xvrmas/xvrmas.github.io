//Lògica del sorteig i resultats

import { ESTAT, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () => {
    carregarEstat();
    const resultatsEl = document.getElementById('resultats');
    if (!resultatsEl) return;

    /* Quants sorteigs hem de mostrar? 
       Si venim de l'index, mostrarem els últims N elements de l'historial 
       que coincideixin amb el que acabem de jugar.
    */
    
    const ultimSorteigData = ESTAT.historial[ESTAT.historial.length - 1]?.data;
    const resultatsAMostrar = ESTAT.historial.filter(h => h.data === ultimSorteigData);

    const renderBoles = (nums, encertsSet = new Set()) =>
        `<div class="balls">${nums.map(n => `<span class="ball ${encertsSet.has(n) ? 'acierto' : ''}">${n}</span>`).join('')}</div>`;

    resultatsAMostrar.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = "resultat-item";
        div.innerHTML = `
            <p>Draw: <strong>${index + 1}</strong> (${item.origen})</p>
            <p>Your bet:</p>
            ${renderBoles(item.aposta, new Set(item.sorteig))}
            <p>Lottery:</p>
            ${renderBoles(item.sorteig)}
            <p>Matches: ${item.encerts} | Win: ${item.premis}€</p>
            <hr>
        `;
        resultatsEl.appendChild(div);
    });
});