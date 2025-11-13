import {SALDO,periode,saldoLotoBolsa} from './main.js'


export function apostar()
{
    SALDO.saldo += 20;
    alert(`${SALDO.saldo}`)
    saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    
}