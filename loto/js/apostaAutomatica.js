import { generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";

document.addEventListener('DOMContentLoaded', () =>
{
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
                const encerts = apostaUsuari.filter(num => guanyadoraSet.has(num));
                const quantitatEncerts = encerts.length;
                console.log('sorteig:', i + 1)
                console.log(`Linea ${index + 1}\n guanyadora[${guanyadora}] \n     usuari[${apostaUsuari}]: ${quantitatEncerts} encerts  (${encerts})\n`)
            })
            i++;
        }
    })
});