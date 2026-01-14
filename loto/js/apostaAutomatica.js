import { generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";
import { cobrarAposta, afegirPremi } from './panellJoc.js';

document.addEventListener('DOMContentLoaded', () =>
{
    const goBoto = document.getElementById('boto-apostes');

    goBoto.addEventListener('click', () =>
    {
        let i = 0;
        if (!cobrarAposta())
        {
            window.location.href = './index.html';
            return;
        }
        while (i < ESTAT.numSorteigs)
        {
            const guanyadora = generarSorteig().sort((a, b) => a - b);
            const guanyadoraSet = new Set(guanyadora);

            ESTAT.apostesAutoUsuari.forEach((apostaUsuari, index) =>
            {
                const encerts = apostaUsuari.filter(num => guanyadoraSet.has(num));
                const quantitatEncerts = encerts.length;
                cobrarAposta();
                console.log('sorteig:', i + 1)
                console.log(`Bet ${index + 1}\n Winner[${guanyadora}] \n     usuari[${apostaUsuari}]: ${quantitatEncerts} Match (${encerts})\n`)
            })
            i++;
        }
    })
});