//pinta els resutats 

import { ESTAT, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{
    carregarEstat();
    const resultatsEl = document.getElementById('resultats');
    if (!resultatsEl) return;

    const ultimSorteigData = ESTAT.historial[ESTAT.historial.length - 1]?.data;
    const resultatsAMostrar = ESTAT.historial.filter(h => h.data === ultimSorteigData);



    const renderBoles = (nums, encertsSet = new Set()) =>

        `<div class="balls">${nums.map(n => `<span class="ball ${console} ${encertsSet.has(n)  
            ? 'acierto'
            : ''}">${n}</span>`).join('')}</div>`;

    const renderBonusBall = (rein, bonus) =>
        rein === bonus
            ? `<span class="ball acierto">${rein}</span> &nbsp;&nbsp;&nbsp; <span class="ball acierto">${bonus}</span>`
            : `<span class="ball">${rein}</span> &nbsp;&nbsp;&nbsp; <span class="ball">${bonus}</span>`

    resultatsAMostrar.forEach((item, index) =>
    {
        const div = document.createElement('div');
        div.className = "resultat-item";
        div.innerHTML = `
            <p>Draw: <strong>${index + 1}</strong> (${item.origen})</p>
            <p>Your bet:</p>
            ${renderBoles(item.aposta, new Set(item.sorteig))}   
            <p>Lottery:</p>
            ${renderBoles(item.sorteig, new Set(item.aposta))} 
            <div class="contenidor-bonus-ball">
            <p>Bonus ball:</p>  
               ${renderBonusBall(ESTAT.reintegrament, item.bonus)}
            </div>
            <p>Matches: ${item.encerts} | Win: ${item.premis}€</p>
            <hr>
        `;
        resultatsEl.appendChild(div);
    })
});