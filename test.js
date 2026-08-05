const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluateGuess, pickWordForDay } = require('./logic.js');

test('evaluateGuess marks an exact match all correct', () => {
  assert.deepEqual(evaluateGuess('crazy', 'crazy'), ['correct', 'correct', 'correct', 'correct', 'correct']);
});

test('evaluateGuess marks letters absent from the answer', () => {
  // "chimp" and "zesty" share no letters at all.
  assert.deepEqual(evaluateGuess('chimp', 'zesty'), ['absent', 'absent', 'absent', 'absent', 'absent']);
});

test('evaluateGuess handles a mix of correct/present/absent', () => {
  // answer "crazy", guess "canoe": c=correct, a=present(wrong spot), n=absent, o=absent, e=absent
  assert.deepEqual(evaluateGuess('canoe', 'crazy'), ['correct', 'present', 'absent', 'absent', 'absent']);
});

test('evaluateGuess does not double-count a repeated letter beyond its occurrences', () => {
  // answer "algae" has one 'a' after the first letter (indices 0 and 3); guess "aaaaa" should
  // mark the two real 'a' positions correct and the rest absent, not all present/correct.
  const result = evaluateGuess('aaaaa', 'algae');
  const correctOrPresent = result.filter(r => r !== 'absent').length;
  assert.equal(correctOrPresent, 2);
});

test('pickWordForDay is deterministic for the same seed', () => {
  const words = ['apple', 'about', 'crazy', 'zebra'];
  const first = pickWordForDay('2026-08-05', words);
  const second = pickWordForDay('2026-08-05', words);
  assert.equal(first, second);
  assert.ok(words.includes(first));
});

test('pickWordForDay picks different words for different seeds (for this word list)', () => {
  const words = ['apple', 'about', 'crazy', 'zebra'];
  const a = pickWordForDay('2026-08-05', words);
  const b = pickWordForDay('2026-08-06', words);
  assert.notEqual(a, b);
});
