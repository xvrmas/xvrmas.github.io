//Estat global del joc

export const ESTAT = {
  saldo: 936,
  pot: 0,
  premis: 0,
  gastat: 0,
  numSorteigs: 1,
  reintegrament: 0,
  historial: [],
  apostaActual: [],
  apostesAutoUsuari: []
};

export function desarEstat()
{
  localStorage.setItem('lotteryState', JSON.stringify(ESTAT));
}

export function carregarEstat()
{
  const data = JSON.parse(localStorage.getItem('lotteryState'));
  if (data)
  {
    ESTAT.saldo = data.saldo;
    ESTAT.pot = data.pot;
    ESTAT.premis = data.premis;
    ESTAT.numSorteigs = data.numSorteigs;
    ESTAT.gastat = data.gastat;
    ESTAT.historial = data.historial || [];
    ESTAT.apostaActual = data.apostaActual || [];
  }
}



