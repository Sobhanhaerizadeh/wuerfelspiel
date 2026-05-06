const state = {
  score1: 0,
  score2: 0,
  round:  1,
  rolling: false
};

const rollBtn    = document.getElementById('rollBtn');
const resetBtn   = document.getElementById('resetBtn');
const face1      = document.getElementById('face1');
const face2      = document.getElementById('face2');
const dice1      = document.getElementById('dice1');
const dice2      = document.getElementById('dice2');
const score1El   = document.getElementById('score1');
const score2El   = document.getElementById('score2');
const roundEl    = document.getElementById('round');
const resultMsg  = document.getElementById('resultMsg');
const player1El  = document.getElementById('player1');
const player2El  = document.getElementById('player2');

const FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function roll() {
  if (state.rolling) return;
  state.rolling = true;
  rollBtn.disabled = true;
  resultMsg.textContent = '';
  resultMsg.className = 'result-msg';


  player1El.classList.remove('winner', 'loser');
  player2El.classList.remove('winner', 'loser');

  dice1.classList.add('rolling');
  dice2.classList.add('rolling');

  const flickerInterval = setInterval(() => {
    face1.textContent = FACES[Math.ceil(Math.random() * 6)];
    face2.textContent = FACES[Math.ceil(Math.random() * 6)];
  }, 60);

  setTimeout(() => {
    clearInterval(flickerInterval);
    dice1.classList.remove('rolling');
    dice2.classList.remove('rolling');

    const roll1 = Math.ceil(Math.random() * 6);
    const roll2 = Math.ceil(Math.random() * 6);

    face1.textContent = FACES[roll1];
    face2.textContent = FACES[roll2];
    face1.classList.remove('pop');
    face2.classList.remove('pop');
    void face1.offsetWidth; 
    void face2.offsetWidth;
    face1.classList.add('pop');
    face2.classList.add('pop');

    if (roll1 > roll2) {
      state.score1++;
      player1El.classList.add('winner');
      player2El.classList.add('loser');
      resultMsg.textContent = '🏆 Spieler 1 gewinnt die Runde!';
      resultMsg.className = 'result-msg win1';

    } else if (roll2 > roll1) {
      state.score2++;
      player1El.classList.add('loser');
      player2El.classList.add('winner');
      resultMsg.textContent = '🏆 Spieler 2 gewinnt die Runde!';
      resultMsg.className = 'result-msg win2';

    } else {
      resultMsg.textContent = '🤝 Unentschieden!';
      resultMsg.className = 'result-msg tie';
    }

    score1El.textContent = state.score1;
    score2El.textContent = state.score2;
    roundEl.textContent  = ++state.round;

    state.rolling    = false;
    rollBtn.disabled = false;

  }, 500);
}

function reset() {
  state.score1  = 0;
  state.score2  = 0;
  state.round   = 1;
  state.rolling = false;

  face1.textContent = '?';
  face2.textContent = '?';
  face1.classList.remove('pop');
  face2.classList.remove('pop');

  score1El.textContent = '0';
  score2El.textContent = '0';
  roundEl.textContent  = '1';

  resultMsg.textContent = '';
  resultMsg.className   = 'result-msg';

  player1El.classList.remove('winner', 'loser');
  player2El.classList.remove('winner', 'loser');

  rollBtn.disabled = false;
}

rollBtn.addEventListener('click', roll);
resetBtn.addEventListener('click', reset);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !state.rolling) {
    e.preventDefault();
    roll();
  }
  if (e.code === 'KeyR') {
    reset();
  }
});
