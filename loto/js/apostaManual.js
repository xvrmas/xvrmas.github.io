//pint la cuadricula del 1 al 49 i permet sel·leccionar 6 numeros 

import { ESTAT, desarEstat, carregarEstat } from './estat.js';

document.addEventListener('DOMContentLoaded', () =>
{

  carregarEstat();

  let seleccioActual = [];

  const contenidor = document.getElementById('selector-numeros');
  const seleccioPinta = document.getElementById('seleccio-actual');
  const botoJugar = document.getElementById('boto-jugar');


  for (let i = 1; i <= 49; i++) 
  {

    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('numero-btn');

    btn.addEventListener('click', () => 
    {
      if (seleccioActual.includes(i)) 
      {
        seleccioActual = seleccioActual.filter(n => n !== i);
        btn.classList.remove('seleccionado');
      }
      else if (seleccioActual.length < 6) 
      {
        seleccioActual.push(i);
        btn.classList.add('seleccionado');
      }

      seleccioPinta.textContent = `Selected: ${seleccioActual.join(' - ')}`;

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

  botoJugar.addEventListener('click', () => 
  {
    const numeroSorteigs = parseInt(document.getElementById('num-sorteigs').value)
    if (seleccioActual.length !== 6)
    {
      alert('You must select exactly 6 numbers');
      return;
    }
    if (isNaN(numeroSorteigs) || numeroSorteigs < 1)
    {
      alert('Please enter a valid number of draws');
    }
    ESTAT.apostaActual = [...seleccioActual];
    ESTAT.numApostes = numeroSorteigs;

    desarEstat();
    window.location.href = './resultado.html';
  });
});




