import { generarReintegrament, generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";
import { cobrarAposta, afegirPremi } from "./panellJoc.js";

document.addEventListener('DOMContentLoaded', () =>
{
    const goBoto = document.getElementById('boto-apostes');
    if (!goBoto) return;
    ESTAT.reintegrament = null;

    goBoto.addEventListener('click', () =>
    {
        carregarEstat();
        if (ESTAT.apostesAutoUsuari.length === 0)
        {
            Swal.fire({ icon: "error", text: 'Please select lines.' });
            return;
        }
        else if (ESTAT.reintegrament === null)
        {
            Swal.fire({
                icon: "error",
                text: 'You must select exactly 1 Bonus Ball',
            })
            return;
        }

        // 1. Fem els càlculs
        let drawsDone = 0;
        while (drawsDone < ESTAT.numSorteigs)
        {
            const guanyadora = generarSorteig().sort((a, b) => a - b);
            const guanyadoraSet = new Set(guanyadora);



            ESTAT.apostesAutoUsuari.forEach((apostaUsuari) =>
            {
                if (!cobrarAposta()) return;

                const reintegreJoc = generarReintegrament();
                const encerts = apostaUsuari.filter(num => guanyadoraSet.has(num));
                const nombreEncerts = encerts.length;
                let encertsBonus = 0;
                let importPremi = 0;

                // Lògica de premis 
                if (nombreEncerts === 6) importPremi = ESTAT.pot || 15000000;
                else if (nombreEncerts === 5) importPremi = 2045.19;
                else if (nombreEncerts === 4) importPremi = 51.81;
                else if (nombreEncerts === 3) importPremi = 8.37;
                
                if (ESTAT.reintegrament === reintegreJoc) 
                {
                    importPremi += 1;
                    encertsBonus = 1;
                }

                if (importPremi > 0) afegirPremi(importPremi);
                else ESTAT.pot += 10;

                // GUARDEM A L'HISTORIAL
                ESTAT.historial.push({
                    origen: "A",
                    aposta: apostaUsuari,
                    sorteig: guanyadora,
                    encerts: nombreEncerts,
                    premis: importPremi,
                    bonusUsuari: ESTAT.reintegrament,
                    bonus: reintegreJoc,
                    data: new Date().toLocaleString()
                });
            });
            drawsDone++;
        }
        ESTAT.numSorteigs = 1;
        desarEstat();
        window.location.href = './resultado.html';
    });
});