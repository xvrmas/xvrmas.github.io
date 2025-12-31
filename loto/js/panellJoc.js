//Gestió de saldo, pot i premis

import { ESTAT, desarEstat, carregarEstat } from './estat.js';



document.addEventListener('DOMContentLoaded', () =>
{
    carregarEstat();
    const saldoEl = document.getElementById('saldo');
    const potEl = document.getElementById('pot');
    const premisEl = document.getElementById('premis');
    const gastatEl = document.getElementById('gastat');
    const botoAfegirFons = document.getElementById('boto-afegir-fons');
    const iteracions = document.getElementById('boto-jugar');


    function actualitzarPanell()
    {
        if (saldoEl) saldoEl.textContent = `Balance: ${ESTAT.saldo}€`;
        if (premisEl) premisEl.textContent = `Win: ${ESTAT.premis}€`;
        if (gastatEl) gastatEl.textContent = `Waste: ${ESTAT.gastat}€`;
        if (potEl) potEl.textContent = `Pot: ${ESTAT.pot}€`;
    }


    actualitzarPanell();


    iteracions.addEventListener('click', () =>
    {
        const element = document.getElementById('num-sorteigs').value

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

export function afegirPremi(importPremi)
{
    ESTAT.premis += importPremi;
    desarEstat();
}






