//pinta la cuadricula del 1 al 49 i permet sel·leccionar 6 numeros i només 6


import { ESTAT, desarEstat, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();

  let seleccioActual = [];
  const contenidor = document.getElementById('selector-numeros');
  const seleccioEl = document.getElementById('seleccio-actual');
  const botoJugar = document.getElementById('boto-jugar');
  const restaSeleccio = document.getElementById('numeros-restants');
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
  const opcions = document.querySelectorAll('input[name="opcio"]');
  const checkAutomatica = document.getElementById('automatica');
  const opcioAutomatica = document.getElementById('opcio-manual');

  opcions.forEach(radio =>
  {
    radio.addEventListener('change', () =>
    {
      if (checkAutomatica.checked)
      {
        opcioAutomatica.classList.add('opcio-visivilitat')
      }
      else
      {
        opcioAutomatica.classList.remove('opcio-visivilitat')
      }
    })
  });


  botoJugar.addEventListener('click', () =>
  {
    if (seleccioActual.length !== 6)
    {
      alert('You must select exactly 6 numbers');
      return;
    }

    ESTAT.apostaActual = [...seleccioActual];
    desarEstat();
    window.location.href = './resultado.html';
  });
});




