//Estat global del joc

export const ESTAT = {
  saldo: 0,
  pot: 0,
  premis: 0,
  gastat: 0,
  numApostes: 0,
  historial: [],
  apostaActual: []
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
    ESTAT.numApostes = data.numApostes;
    ESTAT.gastat = data.gastat;
    ESTAT.historial = data.historial || [];
    ESTAT.apostaActual = data.apostaActual || [];
  }
}



