# Multiplayer Shiritori Game

A two-player Shiritori game built with React and Vite. Players share the same screen and take turns entering valid English words that must start with the last letter of the previous word. Includes live word validation, countdown timer, scoring, and word history.

Dictionary powered by https://dictionaryapi.dev/.


✨ Features

Turn-based play – players take turns automatically

Word validation

Must start with the last letter of the previous word

At least 4 letters long

Can’t repeat a word already used

Must be a real English word (checked online)

Countdown timer (default 15 seconds per turn)

Scoreboard – +1 point for correct words, -1 for wrong or timed out words

Word history – shows all words played so far

Game controls – pause, resume, reset, and edit player names

Simple and responsive UI


## Getting Started


```powershell
npm install
npm run dev
```

Build and preview:

```powershell
npm run build
npm run preview
```

🎮 How to Play

Player 1 types any valid English word (at least 4 letters).

Player 2 must type a word that starts with the last letter of Player 1’s word.

A word can’t be used twice in the same game.

Each player has a countdown timer.

If the timer runs out, or the word is invalid → that player loses 1 point.

A valid word earns +1 point.

The game continues until players decide to stop.


## vercel

Import your repo

Framework preset: Vite

Build command: npm run build

Output directory: dist

## Tech Stack

- React + Vite
- Free Dictionary API for word validation

## Notes

- API calls are cached in-memory to reduce duplicate lookups during a session.
- No server is required.
