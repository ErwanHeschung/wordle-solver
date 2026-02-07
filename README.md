# Wordle Solver

A small TypeScript project that implements utilities to help solve Wordle puzzles.

## Features

- Load a valid Wordle word list from `assets/valid-wordle-words.txt`.
- Provide game state utilities and a solver to suggest candidate words.
- Simple CLI/run entry via the project `start` script.

## Prerequisites

- Node.js (recommended LTS)
- npm

## Install

Install dependencies:

```bash
npm install
```

## Run

Start the project (uses the `start` script from `package.json`):

```bash
npm run start
```

## Project structure

- assets/
  - valid-wordle-words.txt — word list used by the solver
- src/
  - main.ts — application entry
  - models/
    - tile.ts — tile, letter status model
  - utils/
    - assetUtils.ts — helpers for reading `assets` data
    - gameState.ts — game state representation
    - solverUtils.ts — solver logic and helper functions
    - WordleScrape.ts — scraping of the wordle page
- package.json
- tsconfig.json