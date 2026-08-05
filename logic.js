function evaluateGuess(guess, answer) {
  const len = answer.length;
  const result = Array(len).fill('absent');
  const answerArr = answer.split('');
  const used = Array(len).fill(false);
  for (let i = 0; i < len; i++) {
    if (guess[i] === answerArr[i]) { result[i] = 'correct'; used[i] = true; }
  }
  for (let i = 0; i < len; i++) {
    if (result[i] === 'correct') continue;
    const idx = answerArr.findIndex((ch, j) => ch === guess[i] && !used[j]);
    if (idx !== -1) { result[i] = 'present'; used[idx] = true; }
  }
  return result;
}

function pickWordForDay(seedStr, words) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) { h = (h * 31 + seedStr.charCodeAt(i)) >>> 0; }
  return words[h % words.length];
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { evaluateGuess, pickWordForDay };
}
