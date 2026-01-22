import { generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";
import { cobrarAposta, afegirPremi } from "./panellJoc.js";

document.addEventListener('DOMContentLoaded', () => {
    const goBoto = document.getElementById('boto-apostes');
    if (!goBoto) return; // Si no hi ha botó (estem a resultado.html), no facis res

    goBoto.addEventListener('click', () => {
        carregarEstat();
        if (ESTAT.apostesAutoUsuari.length === 0) {
            Swal.fire({ icon: "error", text: 'Please select lines.' });
            return;
        }

        // 1. Fem els càlculs
        let drawsDone = 0;
        while (drawsDone < ESTAT.numSorteigs) {
            const guanyadora = generarSorteig().sort((a, b) => a - b);
            const guanyadoraSet = new Set(guanyadora);

            ESTAT.apostesAutoUsuari.forEach((apostaUsuari) => {
                if (!cobrarAposta()) return;

                const encerts = apostaUsuari.filter(num => guanyadoraSet.has(num));
                const nombreEncerts = encerts.length;
                let importPremi = 0;

                // Lògica de premis 
                if (nombreEncerts === 6) importPremi = ESTAT.pot || 15000000;
                else if (nombreEncerts === 5) importPremi = 2045.19;
                else if (nombreEncerts === 4) importPremi = 51.81;
                else if (nombreEncerts === 3) importPremi = 8.37;
                
                if (importPremi > 0) afegirPremi(importPremi);
                else ESTAT.pot += 10;

                // GUARDEM A L'HISTORIAL
                ESTAT.historial.push({
                    origen: "Random",
                    aposta: apostaUsuari,
                    sorteig: guanyadora,
                    encerts: nombreEncerts,
                    premis: importPremi,
                    data: new Date().toLocaleString()
                });
            });
            drawsDone++;
        }

        // 2. Guardem i marxem a la pàgina de resultats
        ESTAT.numSorteigs = 1;
        desarEstat();
        window.location.href = './resultado.html';
    });
});