
const radioSeleccionat = document.querySelectorAll('input[name="tipo-aposta"]');
const botoSeleccionat = document.getElementById('boto-pronostic');
document.getElementById('boto-loto-bolsa').addEventListener('click', lotoBolsa);
document.getElementById('boto-pronostic').addEventListener('click', omplirApostes);
let periode = 0;
let saldo = 0;



const periodeAposta = document.querySelectorAll('.boto-periodes');

periodeAposta.forEach(element => {
    element.addEventListener('click', function () {
        const periodeText = this.textContent;
        if (periodeText === 'Setmanal') {
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



periodeAposta.forEach(boto => {
    boto.addEventListener('click', function () {
        periodeAposta.forEach(b => {
            b.classList.remove('boto-seleccionat')
        })
        this.classList.add('boto-seleccionat')
    });
});


function lotoBolsa() {
    let saldoLotoBolsa = document.querySelector('.saldo');
    let ingres = Number(prompt('Quants euro vols ingresar?'));
    if (isNaN(ingres))
        alert('Entra una quantitat valida');
    else {
        saldo += ingres;
        saldoLotoBolsa.innerHTML = `Saldo: ${saldo}€`;
    }
}

function omplirApostes() {
    const textBoto = document.getElementById('boto-pronostic').innerText;
    if (textBoto === 'PRONOSTIC') {
        alert('MAL');
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
