export const STATE = {
  saldo: 0,
  bote: 0,
  ganancias:0,
  historial: [],
  apuesta: []
};
export function save() {
  localStorage.setItem('lotteryState', JSON.stringify(STATE));
}

export function load() {
  const data = JSON.parse(localStorage.getItem('lotteryState'));
  if (data) {
    STATE.saldo = data.saldo;
    STATE.bote = data.bote;
    STATE.ganancias = data.ganancias;
    STATE.historial = data.historial || [];
    STATE.apuesta = data.apuesta || [];
  }
}



