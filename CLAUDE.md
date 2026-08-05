# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A single-file Wordle clone with a daily deterministic word, hard mode, and stats tracking. Plain HTML/CSS/JS, no dependencies or build step.

## Running

Open `index.html` directly in a browser.

## Architecture

Everything lives in `index.html`, logic in one IIFE at the bottom.

- **Word selection**: `pickWordForDay(seedStr)` hashes the current date string to deterministically pick the daily word from the `WORDS` list; `ensureWord(true)` (via the ⟳ button) instead picks a random word for an ad-hoc round, distinguished by a `-r<timestamp>` suffix on `state.currentDay`.
- **State**: persisted to `localStorage` under `wordGuessDuel.v1` — includes guesses, game-over/won flags, hard mode, and running stats (played/wins/streak/maxStreak). `replayGuesses()` reconstructs board/keyboard coloring from stored guesses on load.
- **Guess evaluation**: `evaluateGuess(guess, answer)` is a two-pass Wordle algorithm — exact matches marked `correct` first, then remaining letters checked against unused answer letters for `present`, everything else `absent`. Both the live keyboard/tile coloring and `hardModeCheck()` (which enforces reusing revealed hints) depend on this function's output.
- **Rendering**: `tileRefs`/`keyEls` hold direct DOM references, mutated in place rather than re-rendered from a virtual model.
