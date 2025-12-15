import { SALDO, periode, saldoLotoBolsa, textBoto } from './main.js';

const textPlana = document.getElementById('text');
document.getElementById('boto-retorn').addEventListener('click', alerta)

export function alerta()
{
    alert('retorn');
}
export function apostar() 
{

    SALDO.saldo += 2;
    saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    alert(`saldo: ${SALDO.saldo}\nperiode: ` + periode);
   /* let castPeriode = '';

    switch (periode) {
        case 1:
            castPeriode = 'Dia'
            break;
        case 3:
            castPeriode = 'Setmana'
            break;
        case 12:
            castPeriode = 'Mes'
            break;
        default:
            castPeriode = 'Any'
            break;
    }

    let text = ` Saldo: ${SALDO.saldo} \n Periode: ${castPeriode}`;

    textPlana.innerHtml = text;*/
}


/*
export function apostar() {
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


    botoTancament.onclick = function () {
        modal.style.display = 'none';
    };

    contingutModal.appendChild(botoTancament);
    modal.appendChild(contingutModal);

    document.body.appendChild(modal);


    SALDO.saldo += 2;
    saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    alert(`saldo: ${SALDO.saldo}\nperiode: ` + periode );
}*/