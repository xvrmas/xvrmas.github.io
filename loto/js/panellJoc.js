// Gestio de saldo, pot, premis i punts.

import { ESTAT, desarEstat, carregarEstat } from './estat.js';

let saldoEl, puntsEl, jocsDesbloquejatsEl, jocsBloquejatsEl, puntsGastatsEl;
export const COST_APOSTA_PUNTS = 1;

export function actualitzarPanell()
{
    if (!saldoEl) saldoEl = document.getElementById('saldo');
    if (!puntsEl) puntsEl = document.getElementById('punts');
    if (!jocsDesbloquejatsEl) jocsDesbloquejatsEl = document.getElementById('jocs-desbloquejats');
    if (!jocsBloquejatsEl) jocsBloquejatsEl = document.getElementById('jocs-bloquejats');
    if (!puntsGastatsEl) puntsGastatsEl = document.getElementById('punts-gastats');

    const totalJocs = Object.keys(ESTAT.miniJocsDesbloquejats || {}).length;
    const jocsDesbloquejats = Object.values(ESTAT.miniJocsDesbloquejats || {}).filter(Boolean).length;
    const jocsBloquejats = Math.max(0, totalJocs - jocsDesbloquejats);

    if (saldoEl) saldoEl.textContent = `Balance: ${ESTAT.saldo} EUR`;
    if (puntsEl) puntsEl.textContent = `Points: ${ESTAT.punts}`;
    if (jocsDesbloquejatsEl) jocsDesbloquejatsEl.textContent = `Unlocked games: ${jocsDesbloquejats}`;
    if (jocsBloquejatsEl) jocsBloquejatsEl.textContent = `Locked games: ${jocsBloquejats}`;
    if (puntsGastatsEl) puntsGastatsEl.textContent = `Lottery points spent: ${ESTAT.gastat}`;
}

document.addEventListener('DOMContentLoaded', () =>
{
    carregarEstat();
    actualitzarPanell();

    const botoAfegirFons = document.getElementById('boto-afegir-fons');
    const iteracions = document.getElementById('num-sorteigs');

    if (iteracions)
    {
        iteracions.addEventListener('change', (e) =>
        {
            const element = e.target.value;

            if (element === 'dia') ESTAT.numSorteigs = 1;
            else if (element === 'setmana') ESTAT.numSorteigs = 3;
            else if (element === 'mes') ESTAT.numSorteigs = 12;
            else if (element === 'any') ESTAT.numSorteigs = 156;
            else ESTAT.numSorteigs = 0;
            desarEstat();
        });
    }

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
            }
        });
    }
});

export function cobrarAposta()
{
    if (ESTAT.punts >= COST_APOSTA_PUNTS)
    {
        ESTAT.punts -= COST_APOSTA_PUNTS;
        ESTAT.gastat += 1;
        desarEstat();
        actualitzarPanell();
        return true;
    }
    Swal.fire({
        icon: "error",
        text: `You need ${COST_APOSTA_PUNTS} points to place a bet. Play mini games first.`
    });
    return false;
}

export function afegirPremi(importPremi)
{
    ESTAT.premis += importPremi;
    desarEstat();
    actualitzarPanell();
}
