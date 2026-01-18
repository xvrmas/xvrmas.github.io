import { generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";
import { afegirPremi, cobrarAposta } from "./panellJoc.js";
import { actualitzarPanell } from "./panellJoc.js";

document.addEventListener('DOMContentLoaded', () =>
{
    carregarEstat();
    const goBoto = document.getElementById('boto-apostes');


    goBoto.addEventListener('click', () =>
    {
        let i = 0;
        while (i < ESTAT.numSorteigs)
        {
            const guanyadora = generarSorteig().sort((a, b) => a - b);
            const guanyadoraSet = new Set(guanyadora);

            ESTAT.apostesAutoUsuari.forEach((apostaUsuari, index) =>
            {
                cobrarAposta();
                const encerts = apostaUsuari.filter(num => guanyadoraSet.has(num));
                const nombreEncerts = encerts.length;
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
                ESTAT.historial.push({
                    origen: "Random",
                    aposta: apostaUsuari,
                    sorteig: guanyadora,
                    encerts: nombreEncerts,
                    premis: importPremi,
                    data: new Date().toLocaleString()
                });


                console.log('sorteig:', i + 1)
                console.log(`Bet ${index + 1}\n Winner[${guanyadora}] \n     usuari[${apostaUsuari}]: ${nombreEncerts} Match (${encerts})\n gasto: ${ESTAT.gastat}\n -------------------------------PREMI: ${importPremi}`)
            })
            i++;
            actualitzarPanell();
        }
        window.location.href = window.location.href;
    })
});