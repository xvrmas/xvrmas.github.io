import { ESTAT } from './estat.js';

function crearRegles()
{
  const regles = {};

  const grup2 = ['g2_guess', 'g2_odd_even', 'g2_red_black', 'g2_high_low'];
  const grup3 = ['g3_rps', 'g3_dice_target', 'g3_color_match', 'g3_lucky_digit', 'g3_slots'];
  const grup4 = ['g4_double_coin', 'g4_sum7', 'g4_wheel4', 'g4_sequence', 'g4_super_parity'];
  const grup5 = ['g5_triple_match', 'g5_jackpot_color', 'g5_magic_card', 'g5_mega_dice', 'g5_combo_spin'];
  const grup6 = ['g6_super_jackpot'];

  grup2.forEach((k) => { regles[k] = 2; });
  grup3.forEach((k) => { regles[k] = 3; });
  grup4.forEach((k) => { regles[k] = 4; });
  grup5.forEach((k) => { regles[k] = 5; });
  grup6.forEach((k) => { regles[k] = 6; });
  regles.g2_coin = 0;

  return regles;
}

export const REGLES_DESBLOQUEIG = crearRegles();

export const NOMS_DESBLOQUEIG = {
  g2_guess: 'Guess 1-5',
  g2_coin: 'Coin Flip',
  g2_odd_even: 'Odd or Even',
  g2_red_black: 'Red or Black',
  g2_high_low: 'High or Low',
  g3_rps: 'Rock Paper Scissors',
  g3_dice_target: 'Dice Target',
  g3_color_match: 'Color Match',
  g3_lucky_digit: 'Lucky Digit',
  g3_slots: 'Mini Slots',
  g4_double_coin: 'Double Coin',
  g4_sum7: 'Sum is 7',
  g4_wheel4: 'Wheel of 4',
  g4_sequence: 'Pick Sequence',
  g4_super_parity: 'Super Parity',
  g5_triple_match: 'Triple Match',
  g5_jackpot_color: 'Jackpot Color',
  g5_magic_card: 'Magic Card',
  g5_mega_dice: 'Mega Dice',
  g5_combo_spin: 'Combo Spin',
  g6_super_jackpot: 'Super Jackpot'
};

const ORDRE_DESBLOQUEIG = [
  'g2_coin',
  'g2_guess',
  'g2_odd_even',
  'g2_red_black',
  'g2_high_low',
  'g3_rps',
  'g3_dice_target',
  'g3_color_match',
  'g3_lucky_digit',
  'g3_slots',
  'g4_double_coin',
  'g4_sum7',
  'g4_wheel4',
  'g4_sequence',
  'g4_super_parity',
  'g5_triple_match',
  'g5_jackpot_color',
  'g5_magic_card',
  'g5_mega_dice',
  'g5_combo_spin',
  'g6_super_jackpot'
];

export function aplicarDesbloqueigPerEncerts(encerts)
{
  if (!Number.isInteger(encerts) || encerts < 0) return [];

  ESTAT.millorEncerts = Math.max(ESTAT.millorEncerts || 0, encerts);

  for (const key of ORDRE_DESBLOQUEIG)
  {
    const minEncerts = REGLES_DESBLOQUEIG[key];
    if ((ESTAT.millorEncerts >= minEncerts) && !ESTAT.miniJocsDesbloquejats[key])
    {
      ESTAT.miniJocsDesbloquejats[key] = true;
      return [NOMS_DESBLOQUEIG[key] || key];
    }
  }

  return [];
}
