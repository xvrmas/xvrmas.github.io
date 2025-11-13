import {SALDO,periode,saldoLotoBolsa} from './main.js';

export function apostar()
{
    SALDO.saldo += 2;
    alert(`saldo: ${SALDO.saldo}\nperiode: ` + periode )
    saldoLotoBolsa.innerHTML = `Saldo: ${SALDO.saldo}€`;
    
}