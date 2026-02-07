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

```
project-root
├─ assets/valid-wordle-words.txt        # Word list used by the solver
├─ package.json                  # Project metadata and dependencies
├─ tsconfig.json                 # TypeScript configuration
├─ src/
│  ├─ main.ts                    # Application entry point
│  ├─ models/                    # Data models
│  │  └─ tile.ts                 # Tile / letter status model
│  ├─ utils/                     # Utility functions and helpers
│  │  ├─ assetUtils.ts           # Helpers for reading asset data
│  │  ├─ gameState.ts            # Game state representation
│  │  ├─ solverUtils.ts          # Solver logic and helper functions
│  │  └─ WordleScrape.ts         # Scraping logic for the Wordle page
```
