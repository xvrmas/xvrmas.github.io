import {SALDO,periode,saldoLotoBolsa} from './main.js';

function omplirAposta()
{
    let text = 'aqui van les caselles';
    return text;
}

export function apostar()
{
    let contingut = omplirAposta();

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let contingutModal = document.createElement('div');
    contingutModal.classList.add('contingut-modal');
   
    let nodeText = document.createElement('p');
    nodeText.textContent = contingut;
    contingutModal.appendChild(nodeText)

    let botoTancament = document.createElement('span');
    botoTancament.innerHTML = '&times;';
    botoTancament.classList.add('tanca');

    
    botoTancament.onclick = function ()
    {
        modal.style.display = 'none';
    };

    contingutModal.appendChild(botoTancament);
    modal.appendChild(contingutModal);

    document.body.appendChild(modal);


    /*SALDO.saldo += 2;
    saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    alert(`saldo: ${SALDO.saldo}\nperiode: ` + periode );*/
}