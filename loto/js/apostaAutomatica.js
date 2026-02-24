import { generarReintegrament, generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";
import { cobrarAposta, afegirPremi, COST_APOSTA_PUNTS } from "./panellJoc.js";
import { aplicarDesbloqueigPerEncerts } from "./progressioMiniJocs.js";

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
            });
            return;
        }

        const apostesTotals = ESTAT.numSorteigs * ESTAT.apostesAutoUsuari.length;
        const puntsNecessaris = apostesTotals * COST_APOSTA_PUNTS;
        if (ESTAT.punts < puntsNecessaris)
        {
            Swal.fire({
                icon: "warning",
                title: "Not enough points",
                text: `You want ${apostesTotals} bets (${puntsNecessaris} points), but you only have ${ESTAT.punts}. Missing: ${puntsNecessaris - ESTAT.punts} points.`
            });
            return;
        }

        let drawsDone = 0;
        const miniJocsNous = new Set();
        let millorEncertsSessio = -1;
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

                if (nombreEncerts === 6) importPremi = ESTAT.pot || 15000000;
                else if (nombreEncerts === 5) importPremi = 2045.19;
                else if (nombreEncerts === 4) importPremi = 51.81;
                else if (nombreEncerts === 3) importPremi = 8.37;

                if (ESTAT.reintegrament === reintegreJoc)
                {
                    importPremi += 1;
                    encertsBonus = 1;
                }

                millorEncertsSessio = Math.max(millorEncertsSessio, nombreEncerts);

                if (importPremi > 0) afegirPremi(importPremi);
                else ESTAT.pot += 10;

                ESTAT.historial.push({
                    origen: "A",
                    aposta: apostaUsuari,
                    sorteig: guanyadora,
                    encerts: nombreEncerts,
                    premis: importPremi,
                    puntsGuanyats: 0,
                    bonusUsuari: ESTAT.reintegrament,
                    bonus: reintegreJoc,
                    data: new Date().toLocaleString()
                });
            });
            drawsDone++;
        }
        if (millorEncertsSessio >= 0)
        {
            const nousDesbloquejats = aplicarDesbloqueigPerEncerts(millorEncertsSessio);
            nousDesbloquejats.forEach(nom => miniJocsNous.add(nom));
        }
        ESTAT.numSorteigs = 1;
        desarEstat();
        if (miniJocsNous.size > 0)
        {
            const jocs = Array.from(miniJocsNous).join(', ');
            Swal.fire({
                icon: "success",
                title: "New mini game unlocked",
                text: `You unlocked: ${jocs}`
            }).then(() =>
            {
                window.location.href = './resultado.html';
            });
            return;
        }
        window.location.href = './resultado.html';
    });
});
