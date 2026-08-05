# Word Guess Duel

**Live demo: [clowery651-creator.github.io/word-guess-duel](https://clowery651-creator.github.io/word-guess-duel/)**

A single-file Wordle clone with a deterministic daily word, hard mode, and win/streak stats tracked in `localStorage`.

## Running locally

Open `index.html` directly in a browser. No build step or dependencies.

## Tests

The guess-evaluation and daily-word-selection logic live in `logic.js` (shared by the browser and Node) so they can be unit tested. Run with Node's built-in test runner — no npm install needed:

```bash
node --test
```
