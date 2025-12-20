// Gestió de saldo, pot i premis

import { ESTAT, desarEstat, carregarEstat } from "./estat.js";

document.addEventListener("DOMContentLoaded", () =>
{
    carregarEstat();
    const pintaSaldo = document.getElementById("saldo");
    const pintaPot = document.getElementById("pot");
    const pintaPremi = document.getElementById("premis");
    const pintaGastat = document.getElementById("gastat");
    const botoAfegirFons = document.getElementById("boto-afegir-fons");

    function actualitzarPanell()
    {
        if (pintaSaldo) pintaSaldo.textContent = `Balance: ${ESTAT.saldo}€`;
        if (pintaPremi) pintaPremi.textContent = `Win: ${ESTAT.premis}€`;
        if (pintaGastat) pintaGastat.textContent = `Waste: ${ESTAT.gastat}€`;
        if (pintaPot) pintaPot.textContent = `Pot: ${ESTAT.pot}€`;
    }

    actualitzarPanell();

    if (botoAfegirFons)
    {
        botoAfegirFons.addEventListener("click", () =>
        {
            const importIngressat = Number(
                prompt("How much money do you want to add?")
            );
            if (!isNaN(importIngressat) && importIngressat > 0)
            {
                ESTAT.saldo += importIngressat;
                desarEstat();
                actualitzarPanell();
            } else
            {
                alert("Invalid amount");
            }
        });
    }
    console.log("numero de jocs -> ", ESTAT.numApostes);
    console.log("aposta -> ", ESTAT.apostaActual);
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
    alert("You have insufficient funds");
    return false;
}

export function afegirPremi(importPremi)
{
    ESTAT.premis += importPremi;
    desarEstat();
}
