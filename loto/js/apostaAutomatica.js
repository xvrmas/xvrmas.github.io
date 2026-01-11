import { generarSorteig } from "./generadorSorteig.js";
import { ESTAT, desarEstat, carregarEstat } from "./estat.js";

document.addEventListener('DOMContentLoaded', () =>
{
    const goBoto = document.getElementById('boto-apostes');
    const mostrarNumeros = document.getElementById('mostrar-numeros');
    const inputValor = document.getElementById('num-sorteigs-auto');
    const inputCambi = document.getElementById('num-sorteigs-auto');


    inputCambi.addEventListener('change', () =>
    {
        const goValor = parseInt(inputValor.value);

        // 1. Netejar el contenidor abans de posar resultats nous
        mostrarNumeros.innerHTML = "";

        // 2. Generar les apostes
        for (let i = 0; i < goValor; i++)
        {
            const numAuto = generarSorteig().sort((a, b) => a - b);
            ESTAT.apostesAutoUsuari.push(numAuto);
        }
        console.log(ESTAT.apostesAutoUsuari)
        desarEstat();

        // 3. Mostrar-les creant un element NOU per cada aposta
        ESTAT.apostesAutoUsuari.forEach((element, index) =>
        {
            const creaP = document.createElement('p'); // CREAR AQUÍ DINS
            creaP.innerHTML =
                `<div id="seleccio-actual">
                 Block ${index + 1}:<br> ${element.join('-,')}
            </div>
            `;
            mostrarNumeros.appendChild(creaP);
        });
    });

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