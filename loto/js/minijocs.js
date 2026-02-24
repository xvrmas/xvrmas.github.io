import { ESTAT, carregarEstat, desarEstat } from './estat.js';
import { actualitzarPanell, COST_APOSTA_PUNTS } from './panellJoc.js';
import { REGLES_DESBLOQUEIG, aplicarDesbloqueigPerEncerts } from './progressioMiniJocs.js';

const RECOMPENSES_PER_TIER = {
  2: { win: 1, lose: 0 },
  3: { win: 2, lose: 0 },
  4: { win: 3, lose: 0 },
  5: { win: 4, lose: 0 },
  6: { win: 10, lose: 0 }
};

const DURACIO_MONEDA_MS = 1000;
const RETARD_ALERTA_MONEDA_MS = 550;

// Chance games are minority. Most entries are skill_quiz.
const MINI_JOCS = [
  { key: 'g2_guess', nom: 'Bigger Number', tier: 2, icon: '12', mode: 'skill_quiz' },
  { key: 'g2_coin', nom: 'Coin Flip', tier: 2, icon: 'CN', mode: 'chance_coin' },
  { key: 'g2_odd_even', nom: 'Odd or Even', tier: 2, icon: 'OE', mode: 'skill_quiz' },
  { key: 'g2_red_black', nom: 'Suit Color', tier: 2, icon: 'RB', mode: 'skill_quiz' },
  { key: 'g2_high_low', nom: 'High or Low', tier: 2, icon: 'HL', mode: 'skill_quiz' },
  { key: 'g3_rps', nom: 'Rock Paper Scissors', tier: 3, icon: 'RPS', mode: 'chance_rps' },
  { key: 'g3_dice_target', nom: 'Dice Sum', tier: 3, icon: 'D6', mode: 'skill_quiz' },
  { key: 'g3_color_match', nom: 'Color Logic', tier: 3, icon: 'CL', mode: 'skill_quiz' },
  { key: 'g3_lucky_digit', nom: 'Last Digit', tier: 3, icon: 'L7', mode: 'skill_quiz' },
  { key: 'g3_slots', nom: 'Mini Slots', tier: 3, icon: '777', mode: 'chance_slots' },
  { key: 'g4_double_coin', nom: 'Double Coin', tier: 4, icon: '2C', mode: 'chance_double_coin' },
  { key: 'g4_sum7', nom: 'Find Sum 7', tier: 4, icon: 'S7', mode: 'skill_quiz' },
  { key: 'g4_wheel4', nom: 'Opposite Side', tier: 4, icon: 'W4', mode: 'skill_quiz' },
  { key: 'g4_sequence', nom: 'Next in Sequence', tier: 4, icon: 'SQ', mode: 'skill_quiz' },
  { key: 'g4_super_parity', nom: 'Parity Check', tier: 4, icon: 'SP', mode: 'skill_quiz' },
  { key: 'g5_triple_match', nom: 'Triple Match', tier: 5, icon: 'TM', mode: 'chance_triple_match' },
  { key: 'g5_jackpot_color', nom: 'Color Mix', tier: 5, icon: 'JC', mode: 'skill_quiz' },
  { key: 'g5_magic_card', nom: 'Higher Card', tier: 5, icon: 'MC', mode: 'skill_quiz' },
  { key: 'g5_mega_dice', nom: 'Mega Dice Logic', tier: 5, icon: 'MD', mode: 'skill_quiz' },
  { key: 'g5_combo_spin', nom: 'Combo Spin', tier: 5, icon: 'CS', mode: 'chance_combo_spin' },
  { key: 'g6_super_jackpot', nom: 'Super Jackpot', tier: 6, icon: 'SJ', mode: 'chance_super_jackpot' }
];

const CHALLENGES = {};

function getMiniJoc(key)
{
  return MINI_JOCS.find((j) => j.key === key);
}

function randomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem(arr)
{
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr)
{
  const clone = [...arr];
  for (let i = clone.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function createSkillChallenge(key)
{
  if (key === 'g2_guess')
  {
    const a = randomInt(1, 30);
    const b = randomInt(1, 30);
    return {
      prompt: `Which number is bigger? ${a} or ${b}`,
      options: [String(a), String(b)],
      answer: String(Math.max(a, b))
    };
  }
  if (key === 'g2_odd_even')
  {
    const n = randomInt(1, 99);
    return {
      prompt: `${n} is...`,
      options: ['odd', 'even'],
      answer: n % 2 === 0 ? 'even' : 'odd'
    };
  }
  if (key === 'g2_red_black')
  {
    const suit = randomItem(['hearts', 'diamonds', 'clubs', 'spades']);
    const red = (suit === 'hearts' || suit === 'diamonds');
    return {
      prompt: `What color is ${suit.toUpperCase()}?`,
      options: ['red', 'black'],
      answer: red ? 'red' : 'black'
    };
  }
  if (key === 'g2_high_low')
  {
    const n = randomInt(1, 10);
    return {
      prompt: `${n} belongs to LOW (1-5) or HIGH (6-10)?`,
      options: ['low', 'high'],
      answer: n <= 5 ? 'low' : 'high'
    };
  }
  if (key === 'g3_dice_target')
  {
    const a = randomInt(1, 6);
    const b = randomInt(1, 6);
    const c = randomInt(1, 6);
    const sum = a + b + c;
    const wrong1 = Math.max(3, sum - randomInt(1, 3));
    const wrong2 = Math.min(18, sum + randomInt(1, 3));
    return {
      prompt: `Dice are ${a}, ${b}, ${c}. What is the sum?`,
      options: shuffle([String(sum), String(wrong1), String(wrong2)]),
      answer: String(sum)
    };
  }
  if (key === 'g3_color_match')
  {
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);
    let answer = 'orange';
    if (b > g && b > r) answer = 'blue';
    else if (g > r && g > b) answer = 'green';
    return {
      prompt: `Dominant color in RGB(${r},${g},${b})?`,
      options: ['blue', 'green', 'orange'],
      answer
    };
  }
  if (key === 'g3_lucky_digit')
  {
    const a = randomInt(7, 19);
    const b = randomInt(7, 19);
    const ans = (a * b) % 10;
    return {
      prompt: `Last digit of ${a} x ${b}?`,
      options: shuffle([String(ans), String((ans + 3) % 10), String((ans + 6) % 10)]),
      answer: String(ans)
    };
  }
  if (key === 'g4_sum7')
  {
    const candidates = shuffle(['1+6', '2+5', '3+4', '2+2']);
    const correct = randomItem(['1+6', '2+5', '3+4']);
    return {
      prompt: 'Pick a pair that sums to 7:',
      options: shuffle([correct, ...candidates.filter(c => c !== correct).slice(0, 2)]),
      answer: correct
    };
  }
  if (key === 'g4_wheel4')
  {
    const dir = randomItem(['north', 'south', 'east', 'west']);
    const map = { north: 'south', south: 'north', east: 'west', west: 'east' };
    return {
      prompt: `Opposite direction of ${dir.toUpperCase()}?`,
      options: ['north', 'south', 'east', 'west'],
      answer: map[dir]
    };
  }
  if (key === 'g4_sequence')
  {
    const start = randomInt(1, 8);
    const step = randomItem([2, 3, 4]);
    const a = start;
    const b = start + step;
    const c = start + step * 2;
    const d = start + step * 3;
    return {
      prompt: `Next number: ${a}, ${b}, ${c}, ?`,
      options: shuffle([String(d), String(d + 1), String(d - 1)]),
      answer: String(d)
    };
  }
  if (key === 'g4_super_parity')
  {
    const a = randomInt(1, 20);
    const b = randomInt(1, 20);
    return {
      prompt: `Parity of ${a}+${b}?`,
      options: ['odd', 'even'],
      answer: ((a + b) % 2 === 0) ? 'even' : 'odd'
    };
  }
  if (key === 'g5_jackpot_color')
  {
    const pair = randomItem([
      ['blue', 'yellow', 'green'],
      ['red', 'blue', 'purple'],
      ['blue', 'green', 'teal']
    ]);
    return {
      prompt: `${pair[0].toUpperCase()} + ${pair[1].toUpperCase()} = ?`,
      options: ['green', 'purple', 'teal'],
      answer: pair[2]
    };
  }
  if (key === 'g5_magic_card')
  {
    const ranks = ['J', 'Q', 'K', 'A'];
    const v = { J: 1, Q: 2, K: 3, A: 4 };
    const a = randomItem(ranks);
    const b = randomItem(ranks);
    const answer = v[a] >= v[b] ? a : b;
    return {
      prompt: `Higher card: ${a} vs ${b}`,
      options: ranks,
      answer
    };
  }
  if (key === 'g5_mega_dice')
  {
    const a = randomInt(1, 6);
    const b = randomInt(1, 6);
    const c = randomInt(1, 6);
    const sum = a + b + c;
    return {
      prompt: `${a}+${b}+${c} is >= 12 ?`,
      options: ['yes', 'no'],
      answer: sum >= 12 ? 'yes' : 'no'
    };
  }
  return null;
}

function setChallengeUI(key)
{
  const challenge = CHALLENGES[key];
  if (!challenge) return;
  const q = document.getElementById(`q-${key}`);
  const sel = document.getElementById(`pick-${key}`);
  if (q) q.textContent = challenge.prompt;
  if (sel)
  {
    sel.innerHTML = challenge.options.map((o) => `<option value="${o}">${o.toUpperCase()}</option>`).join('');
  }
}

function refreshChallenge(key)
{
  CHALLENGES[key] = createSkillChallenge(key);
  setChallengeUI(key);
}

function renderControls(joc)
{
  if (joc.mode === 'skill_quiz')
  {
    return `
      <p class="skill-question" id="q-${joc.key}">...</p>
      <select id="pick-${joc.key}"></select>
    `;
  }
  if (joc.mode === 'chance_rps')
  {
    return `<select id="pick-${joc.key}"><option value="rock">ROCK</option><option value="paper">PAPER</option><option value="scissors">SCISSORS</option></select>`;
  }
  return '';
}

function renderVisual(joc)
{
  if (joc.mode === 'chance_slots' || joc.mode === 'chance_triple_match')
  {
    return `<div class="mini-visual mode-reels"><span class="mini-reel" id="v-${joc.key}-a">?</span><span class="mini-reel" id="v-${joc.key}-b">?</span><span class="mini-reel" id="v-${joc.key}-c">?</span></div>`;
  }
  if (joc.mode === 'chance_double_coin')
  {
    return `<div class="mini-visual mode-coins"><span class="mini-coin" id="v-${joc.key}-a">H</span><span class="mini-coin" id="v-${joc.key}-b">T</span></div>`;
  }
  if (joc.mode === 'chance_rps')
  {
    return `<div class="mini-visual mode-rps"><span class="mini-rps" id="v-${joc.key}-pick">?</span><span class="mini-vs">VS</span><span class="mini-rps" id="v-${joc.key}-cpu">?</span></div>`;
  }
  if (joc.mode === 'chance_combo_spin')
  {
    return `<div class="mini-visual mode-combo"><span class="mini-color-chip" id="v-${joc.key}-color">RED</span><span class="mini-number-chip" id="v-${joc.key}-num">0</span></div>`;
  }
  if (joc.mode === 'chance_super_jackpot')
  {
    return `<div class="mini-visual mode-jackpot"><span id="v-${joc.key}-num">00</span></div>`;
  }
  return `<div class="mini-visual mode-single"><span id="v-${joc.key}-main">SKILL</span></div>`;
}

function renderJocCard(joc)
{
  return `
    <article class="mini-joc-card is-locked" id="card-${joc.key}">
      <div class="doodle-title doodle-tier-${joc.tier}">
        <span class="doodle-badge">${joc.icon}</span>
        <h3>${joc.nom}</h3>
      </div>
      <p class="lock-text" id="${joc.key}-lock">Locked</p>
      <div class="mini-joc-content">
        ${renderVisual(joc)}
        ${renderControls(joc)}
        <button type="button" data-play="${joc.key}">Play</button>
      </div>
    </article>
  `;
}

function renderGrups()
{
  const container = document.getElementById('mini-jocs-groups');
  if (!container) return;

  const starterCoin = `
    <section class="starter-coin-section">
      <h3>Starter game (always visible)</h3>
      <article class="mini-joc-card is-locked starter-coin-card" id="card-g2_coin">
        <div class="doodle-title doodle-tier-2">
          <span class="doodle-badge">CN</span>
          <h3>Coin Flip</h3>
        </div>
        <p class="lock-text" id="g2_coin-lock">Locked</p>
        <div class="mini-joc-content">
          <div class="mini-visual coin-visual">
            <div class="coin" id="coin-disc">
              <div class="coin-face coin-front">HEADS</div>
              <div class="coin-face coin-back">TAILS</div>
            </div>
          </div>
          <select id="pick-g2_coin">
            <option value="heads">HEADS</option>
            <option value="tails">TAILS</option>
          </select>
          <button type="button" id="btn-play-coin" data-play="g2_coin">Play Coin Flip</button>
        </div>
      </article>
    </section>
  `;

  const tiers = [2, 3, 4, 5, 6];
  container.innerHTML = starterCoin + tiers.map((tier) =>
  {
    const jocsTier = MINI_JOCS.filter((j) => j.tier === tier && j.key !== 'g2_coin');
    const title = tier === 6 ? '6 matches - Super Game' : `${tier} matches`;
    return `<section class="mini-tier"><h3>${title}</h3><div class="mini-joc-grid">${jocsTier.map(renderJocCard).join('')}</div></section>`;
  }).join('');
}

function estaDesbloquejat(key)
{
  return !!ESTAT.miniJocsDesbloquejats[key];
}

function actualitzarMiniJocsUI()
{
  const millorEncertsEl = document.getElementById('millor-encerts');
  if (millorEncertsEl) millorEncertsEl.textContent = `Best matches: ${ESTAT.millorEncerts || 0}`;

  MINI_JOCS.forEach((joc) =>
  {
    const lockEl = document.getElementById(`${joc.key}-lock`);
    const card = document.getElementById(`card-${joc.key}`);
    if (!lockEl || !card) return;
    const minEncerts = REGLES_DESBLOQUEIG[joc.key];
    const unlocked = estaDesbloquejat(joc.key);
    lockEl.textContent = unlocked ? `Unlocked (${minEncerts}+ matches reached)` : `Locked - Needs ${minEncerts} matches in lottery`;
    card.classList.remove('is-locked', 'is-unlocked');
    card.classList.add(unlocked ? 'is-unlocked' : 'is-locked');
  });
}

function atorgarPunts(q)
{
  ESTAT.punts += q;
  desarEstat();
  actualitzarPanell();
  actualitzarMiniJocsUI();
}

function mostrarResultat(text)
{
  const out = document.getElementById('mini-joc-resultat');
  if (out) out.textContent = text;
}

function mostrarAlertaMiniJoc(nomJoc, win, punts, detall)
{
  const apostesDisponibles = Math.floor(ESTAT.punts / COST_APOSTA_PUNTS);
  Swal.fire({
    icon: win ? 'success' : 'error',
    title: win ? 'You won!' : 'You lost',
    html: `<p><strong>${nomJoc}</strong></p><p>${detall}</p><p>Points: <strong>${punts}</strong></p><p>Available bets now: <strong>${apostesDisponibles}</strong></p>`
  });
}

function setText(id, value)
{
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function animateCardResult(key, win)
{
  const card = document.getElementById(`card-${key}`);
  if (!card) return;
  card.classList.remove('result-win', 'result-lose');
  void card.offsetWidth;
  card.classList.add(win ? 'result-win' : 'result-lose');
}

function jugarMonedaAnimada(joc, recompensaCfg)
{
  const pickEl = document.getElementById('pick-g2_coin');
  const moneda = document.getElementById('coin-disc');
  const boto = document.getElementById('btn-play-coin');
  if (!pickEl || !moneda || !boto) return;

  const pick = pickEl.value;
  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  boto.disabled = true;

  moneda.classList.remove('is-flipping');
  void moneda.offsetWidth;
  moneda.classList.add('is-flipping');

  window.setTimeout(() =>
  {
    moneda.classList.remove('show-tails');
    if (result === 'tails') moneda.classList.add('show-tails');

    const win = pick === result;
    const punts = win ? recompensaCfg.win : recompensaCfg.lose;
    const detall = `Pick: ${pick.toUpperCase()} | Result: ${result.toUpperCase()}`;
    animateCardResult(joc.key, win);
    atorgarPunts(punts);
    mostrarResultat(`${joc.nom}: ${detall}. Points ${win ? '+' : ''}${punts}.`);

    window.setTimeout(() =>
    {
      mostrarAlertaMiniJoc(joc.nom, win, punts, detall);
      boto.disabled = false;
    }, RETARD_ALERTA_MONEDA_MS);
  }, DURACIO_MONEDA_MS);
}

function jugar(joc)
{
  if (!estaDesbloquejat(joc.key))
  {
    mostrarResultat(`${joc.nom} is locked. Reach ${REGLES_DESBLOQUEIG[joc.key]} matches in lottery.`);
    return;
  }

  const recompensaCfg = RECOMPENSES_PER_TIER[joc.tier] || { win: 1, lose: 0 };
  if (joc.key === 'g2_coin')
  {
    jugarMonedaAnimada(joc, recompensaCfg);
    return;
  }

  let win = false;
  let detall = '';

  if (joc.mode === 'skill_quiz')
  {
    const ch = CHALLENGES[joc.key];
    const pickEl = document.getElementById(`pick-${joc.key}`);
    if (!ch || !pickEl) return;
    const pick = pickEl.value;
    win = pick === ch.answer;
    detall = `${ch.prompt} | Your answer: ${pick.toUpperCase()} | Correct: ${ch.answer.toUpperCase()}`;
    refreshChallenge(joc.key);
  }
  else if (joc.mode === 'chance_rps')
  {
    const pickEl = document.getElementById(`pick-${joc.key}`);
    if (!pickEl) return;
    const pick = pickEl.value;
    const res = randomItem(['rock', 'paper', 'scissors']);
    win = (pick === 'rock' && res === 'scissors') || (pick === 'paper' && res === 'rock') || (pick === 'scissors' && res === 'paper');
    setText(`v-${joc.key}-pick`, pick[0].toUpperCase());
    setText(`v-${joc.key}-cpu`, res[0].toUpperCase());
    detall = `Pick: ${pick.toUpperCase()} | CPU: ${res.toUpperCase()}`;
  }
  else if (joc.mode === 'chance_slots')
  {
    const sym = ['7', 'BAR', 'GEM'];
    const a = randomItem(sym); const b = randomItem(sym); const c = randomItem(sym);
    win = a === b && b === c;
    setText(`v-${joc.key}-a`, a); setText(`v-${joc.key}-b`, b); setText(`v-${joc.key}-c`, c);
    detall = `Result: ${a} | ${b} | ${c}`;
  }
  else if (joc.mode === 'chance_double_coin')
  {
    const a = randomItem(['heads', 'tails']); const b = randomItem(['heads', 'tails']);
    win = a === b;
    setText(`v-${joc.key}-a`, a === 'heads' ? 'H' : 'T');
    setText(`v-${joc.key}-b`, b === 'heads' ? 'H' : 'T');
    detall = `Coins: ${a.toUpperCase()} + ${b.toUpperCase()}`;
  }
  else if (joc.mode === 'chance_triple_match')
  {
    const arr = ['A', 'B', 'C', 'D'];
    const a = randomItem(arr); const b = randomItem(arr); const c = randomItem(arr);
    win = a === b && b === c;
    setText(`v-${joc.key}-a`, a); setText(`v-${joc.key}-b`, b); setText(`v-${joc.key}-c`, c);
    detall = `Draw: ${a}-${b}-${c}`;
  }
  else if (joc.mode === 'chance_combo_spin')
  {
    const color = randomItem(['red', 'blue']);
    const digit = randomInt(0, 9);
    win = color === 'red' && digit >= 7;
    setText(`v-${joc.key}-color`, color.toUpperCase());
    setText(`v-${joc.key}-num`, String(digit));
    const chip = document.getElementById(`v-${joc.key}-color`);
    if (chip) chip.style.background = color === 'red' ? '#e74c3c' : '#3498db';
    detall = `Spin: ${color.toUpperCase()} + ${digit}`;
  }
  else if (joc.mode === 'chance_super_jackpot')
  {
    const n = randomInt(1, 100);
    win = n === 77;
    setText(`v-${joc.key}-num`, String(n).padStart(2, '0'));
    detall = `Jackpot number: ${n}`;
  }

  animateCardResult(joc.key, win);
  const punts = win ? recompensaCfg.win : recompensaCfg.lose;
  atorgarPunts(punts);
  mostrarResultat(`${joc.nom}: ${detall}. Points ${win ? '+' : ''}${punts}.`);
  mostrarAlertaMiniJoc(joc.nom, win, punts, detall);
}

function bindEvents()
{
  document.querySelectorAll('[data-play]').forEach((btn) =>
  {
    btn.addEventListener('click', () =>
    {
      const key = btn.getAttribute('data-play');
      const joc = getMiniJoc(key);
      if (joc) jugar(joc);
    });
  });
}

function initSkillChallenges()
{
  MINI_JOCS.filter(j => j.mode === 'skill_quiz').forEach((j) =>
  {
    refreshChallenge(j.key);
  });
}

document.addEventListener('DOMContentLoaded', () =>
{
  carregarEstat();
  renderGrups();
  initSkillChallenges();
  aplicarDesbloqueigPerEncerts(ESTAT.millorEncerts || 0);
  desarEstat();
  actualitzarPanell();
  actualitzarMiniJocsUI();
  bindEvents();
});

