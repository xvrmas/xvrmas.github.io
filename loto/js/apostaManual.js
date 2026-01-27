//pinta la cuadricula del 1 al 49 i permet sel·leccionar 6 numeros i només 6

import { generarSorteig, generarReintegrament } from './generadorSorteig.js';
import { cobrarAposta, afegirPremi } from './panellJoc.js'
import { ESTAT, desarEstat, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  const contenidor = document.getElementById('selector-numeros');
  const seleccioEl = document.getElementById('seleccio-actual');
  const botoJugar = document.getElementById('boto-jugar');
  const restaSeleccio = document.getElementById('numeros-restants');

  const mostrarNumeros = document.getElementById('mostrar-numeros');
  const inputValor = document.getElementById('num-sorteigs-auto');
  const inputCambi = document.getElementById('num-sorteigs-auto');

  const opcions = document.querySelectorAll('input[name="opcio"]');
  const checkAutomatica = document.getElementById('automatica');
  const checManual = document.getElementById('manual')
  const opcioAutomatica = document.getElementById('opcio-manual');
  const opcioManual = document.getElementById('opcio-automatica');
  const botoPlay = document.getElementById('boto-jugar');

  opcioManual.classList.add('opcio-oculta');

  let seleccioActual = [];


  inputCambi.addEventListener('change', () =>
  {
    const goValor = parseInt(inputValor.value);

    // 1. Netejar el contenidor abans de posar resultats nous
    mostrarNumeros.innerHTML = "";
    ESTAT.apostesAutoUsuari = [];

    // 2. Generar les apostes
    for (let i = 0; i < goValor; i++)
    {
      const numAuto = generarSorteig().sort((a, b) => a - b);
      ESTAT.apostesAutoUsuari.push(numAuto);
    }
    desarEstat();

    // 3. Mostrar-les creant un element NOU per cada aposta
    ESTAT.apostesAutoUsuari.forEach((element, index) =>
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

  let j = 6;

  for (let i = 1; i <= 49; i++)
  {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('numero-btn');

    btn.addEventListener('click', () =>
    {
      if (seleccioActual.includes(i))
      {
        j++;
        seleccioActual = seleccioActual.filter(n => n !== i);
        btn.classList.remove('seleccionado');
        restaSeleccio.innerHTML = j;
      } else if (seleccioActual.length < 6)
      {
        j--;
        seleccioActual.push(i);
        btn.classList.add('seleccionado');
        restaSeleccio.innerHTML = j;
      }
      seleccioEl.textContent = `Selected: ${seleccioActual.sort((a, b) => a - b).join(' - ')}`;

      contenidor.querySelectorAll('button').forEach(b =>
      {
        if (!seleccioActual.includes(Number(b.textContent)))
        {
          b.disabled = seleccioActual.length >= 6;
        }
      });
    });

    contenidor.appendChild(btn);
  }



  opcions.forEach(radio =>
  {
    radio.addEventListener('change', () =>
    {
      if (checkAutomatica.checked && !checManual.checked)
      {
        opcioAutomatica.classList.add('opcio-oculta');
        opcioManual.classList.remove('opcio-oculta');
        botoJugar.classList.add('opcio-oculta');
      }
      else
      {
        opcioAutomatica.classList.remove('opcio-oculta');
        opcioManual.classList.add('opcio-oculta');
        botoJugar.classList.remove('opcio-oculta');
      }
    })
  });



  botoJugar.addEventListener('click', () =>
  {
    if (seleccioActual.length !== 6)
    {
      Swal.fire({
        icon: "error",
        text: 'You must select exactly 6 numbers',
      })
      return;
    }

    ESTAT.apostaActual = [...seleccioActual];

    let i = 0;
    var contador = 0;
    var index = 0;
    while (i < ESTAT.numSorteigs)
    {
      const guanyadora = generarSorteig().sort((a, b) => a - b);
      const guanyadoraSet = new Set(guanyadora);
      const encerts = seleccioActual.filter(num => guanyadoraSet.has(num));
      const nombreEncerts = encerts.length;

      const reintegreJoc = generarReintegrament();
      ESTAT.reintegramentBanca = reintegreJoc;
      let importPremi = 0;

      if (ESTAT.reintegrament === reintegreJoc)
      {
        ESTAT.premis;
        index++;
      }

      // Lògica de premis 
      if (nombreEncerts === 6) importPremi = ESTAT.pot || 15000000;
      else if (nombreEncerts === 5) importPremi = 2045.19;
      else if (nombreEncerts === 4) importPremi = 51.81;
      else if (nombreEncerts === 3) importPremi = 8.37;

      if (importPremi > 0) afegirPremi(importPremi);
      else ESTAT.pot += 10;
      cobrarAposta();

      // GUARDEM A L'HISTORIAL
      ESTAT.historial.push({
        origen: "manual",
        aposta: seleccioActual,
        sorteig: guanyadora,
        encerts: nombreEncerts,
        premis: importPremi,
        bonus: reintegreJoc,
        data: new Date().toLocaleString()
      });
      i++;
    }

    ESTAT.numSorteigs = 1;
    console.log('total reintegrament: ', contador)
    desarEstat();
    window.location.href = './resultado.html';
  });
});




