
import { apostar } from './apostaManual.js'

const radioSeleccionat = document.querySelectorAll('input[name="tipo-aposta"]');
const botoSeleccionat = document.getElementById('boto-pronostic');
const periodeAposta = document.querySelectorAll('.boto-periodes');

export let saldoLotoBolsa = document.querySelector('.saldo');
export let periode = 1;
export const SALDO = {
    saldo: 0
};
export let gasto = 0;

document.getElementById('boto-loto-bolsa').addEventListener('click', lotoBolsa);
document.getElementById('boto-pronostic').addEventListener('click', omplirApostes);

periodeAposta.forEach(element => {
    element.addEventListener('click', function () {
        const periodeText = this.textContent;
        if (periodeText === 'Dia') {
            periode = 1;
        }
        else if (periodeText === 'Setmanal') {
            periode = 3;
        }
        else if (periodeText == 'Mensual') {
            periode = 12;
        }
        else {
            periode = 624;
        }
    })
})

const botoInicial = document.getElementById('dia');4

if (botoInicial)
{
    botoInicial.classList.add('boto-seleccionat');
}

periodeAposta.forEach(boto => {
    boto.addEventListener('click', function () {
        periodeAposta.forEach(b => {
            b.classList.remove('boto-seleccionat')
        })
        this.classList.add('boto-seleccionat')
    });
});


function lotoBolsa() {
    let ingres = Number(prompt('Quants euro vols ingresar?'));
    if (isNaN(ingres))
        alert('Entra una quantitat valida');
    else {
        SALDO.saldo += ingres;
        saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    }
}

function omplirApostes() {
    const textBoto = document.getElementById('boto-pronostic').innerText;
    if (textBoto === 'PRONOSTIC') {
        apostar();
    }
    else
        alert('MUY MAL')
}


function cambiarOpcioAposta() {
    radioSeleccionat.forEach(radio => {
        if (radio.checked) {
            const valorSeleccionat = radio.value;
            let nouText = '';

            if (valorSeleccionat === 'manual') {
                nouText = 'PRONOSTIC';

            }
            else if (valorSeleccionat === 'automatica') {
                nouText = 'VALIDAR';
            }

            botoSeleccionat.textContent = nouText;
            return;
        }

    });
}

radioSeleccionat.forEach(radio => {
    radio.addEventListener('change', cambiarOpcioAposta)
});

cambiarOpcioAposta();
