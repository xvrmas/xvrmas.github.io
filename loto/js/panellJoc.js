//Gestió de saldo, pot i premis

import { ESTAT, desarEstat, carregarEstat } from './estat.js';

let saldoEl, potEl, premisEl, gastatEl;

export function actualitzarPanell()
{
    if (!saldoEl) saldoEl = document.getElementById('saldo');
    if (!potEl) potEl = document.getElementById('pot');
    if (!premisEl) premisEl = document.getElementById('premis');
    if (!gastatEl) gastatEl = document.getElementById('gastat');

    if (saldoEl) saldoEl.textContent = `Balance: ${ESTAT.saldo}€`;
    if (premisEl) premisEl.textContent = `Win: ${ESTAT.premis.toFixed(2)}€`;
    if (gastatEl) gastatEl.textContent = `Waste: ${ESTAT.gastat}€`;
    if (potEl) potEl.textContent = `Pot: ${ESTAT.pot}€`;
}


document.addEventListener('DOMContentLoaded', () =>
{
    carregarEstat();
    actualitzarPanell();

    const botoAfegirFons = document.getElementById('boto-afegir-fons');
    const iteracions = document.getElementById('num-sorteigs');

    iteracions.addEventListener('change', (e) =>
    {
        const element = e.target.value;

        if (element === 'dia')
        {
            ESTAT.numSorteigs = 1;
        }
        else if (element === 'setmana')
        {
            ESTAT.numSorteigs = 3;
        }
        else if (element === 'mes')
        {
            ESTAT.numSorteigs = 12;

        }
        else if (element === 'any')
        {
            ESTAT.numSorteigs = 156;
        }
        else
        {
            ESTAT.numSorteigs = 0;
        }
        console.log('panell', ESTAT.numSorteigs)
        desarEstat();
    })

    if (botoAfegirFons)
    {
        botoAfegirFons.addEventListener('click', () =>
        {
            const importIngressat = Number(prompt('How much money do you want to add?'));
            if (!isNaN(importIngressat) && importIngressat > 0)
            {
                ESTAT.saldo += importIngressat;
                desarEstat();
                actualitzarPanell();
            } else
            {
                alert('Invalid amount');
            }
        });
    }
});

export function cobrarAposta()
{
    if (ESTAT.saldo >= 1)
    {
        ESTAT.saldo -= 1;
        ESTAT.gastat += 1;
        desarEstat();
        return true;
    }
    alert('You have insufficient funds');
    return false;
}

var i = 1;

export function afegirPremi(importPremi)
{
    ESTAT.premis += importPremi;
    desarEstat();
    i++;


}






