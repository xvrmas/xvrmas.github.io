//Estat global del joc


export const ESTAT = {
  saldo: 936,
  pot: 0,
  premis: 0,
  gastat: 0,
  punts: 0,
  millorEncerts: 0,
  numSorteigs: 1,
  reintegrament: null,
  reintegramentBanca: 0,
  historial: [],
  apostaActual: [],
  apostesAutoUsuari: [],
  miniJocsDesbloquejats: {
    g2_guess: false,
    g2_coin: false,
    g2_odd_even: false,
    g2_red_black: false,
    g2_high_low: false,
    g3_rps: false,
    g3_dice_target: false,
    g3_color_match: false,
    g3_lucky_digit: false,
    g3_slots: false,
    g4_double_coin: false,
    g4_sum7: false,
    g4_wheel4: false,
    g4_sequence: false,
    g4_super_parity: false,
    g5_triple_match: false,
    g5_jackpot_color: false,
    g5_magic_card: false,
    g5_mega_dice: false,
    g5_combo_spin: false,
    g6_super_jackpot: false
  }
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
    ESTAT.punts = data.punts ?? ESTAT.punts;
    ESTAT.millorEncerts = data.millorEncerts ?? ESTAT.millorEncerts;
    ESTAT.reintegrament = data.reintegrament;
    ESTAT.reintegramentBanca = data.reintegramentBanca;
    ESTAT.gastat = data.gastat;
    ESTAT.historial = data.historial || [];
    ESTAT.apostaActual = data.apostaActual || [];
    ESTAT.apostesAutoUsuari = data.apostesAutoUsuari || [];
    ESTAT.miniJocsDesbloquejats = {
      ...ESTAT.miniJocsDesbloquejats,
      ...(data.miniJocsDesbloquejats || {})
    };
  }
}



