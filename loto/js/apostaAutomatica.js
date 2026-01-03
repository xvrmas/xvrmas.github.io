import { generarSorteig } from "./generadorSorteig.js";

document.addEventListener('DOMContentLoaded', () =>
{
   // const goBoto = document.getElementById('boto-apostes');
    const mostrarNumeros = document.getElementById('mostrar-numeros');
    const inputValor = document.getElementById('num-sorteigs-auto');
    const inputCambi = document.getElementById('num-sorteigs-auto')

    inputCambi.addEventListener('change', () =>
    {
        const goValor = parseInt(inputValor.value);
        let numApostesAuto = [];

        // 1. Netejar el contenidor abans de posar resultats nous
        mostrarNumeros.innerHTML = "";

        // 2. Generar les apostes
        for (let i = 0; i < goValor; i++)
        {
            const numAuto = generarSorteig().sort((a, b) => a - b);
            numApostesAuto.push(numAuto);
        }

        // 3. Mostrar-les creant un element NOU per cada aposta
        numApostesAuto.forEach((element, index) =>
        {
            const creaP = document.createElement('p'); // CREAR AQUÍ DINS
            creaP.innerHTML = 
            `<div id="seleccio-actual">
                 Block ${index + 1}:<br> ${element.join('-')}
            </div>
            `;
            mostrarNumeros.appendChild(creaP);
        });
    });
});