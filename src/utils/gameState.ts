import { Tile } from "../models/tile";


type PositionalLetter = { letter: string; index: number };

export class GameState {
    guesses: Tile[][] = [];

    corrects: PositionalLetter[] = [];
    present: PositionalLetter[] = [];
    incorrect: Set<string> = new Set();

    constructor(private wordLength: number = 5) { }

    addGuess(guess: Tile[]) {
        if (guess.length !== this.wordLength) {
            throw new Error(`Guess must be ${this.wordLength} letters`);
        }

        this.guesses.push(guess);

        guess.forEach((tile, index) => {
            if (
                tile.state === 'correct' &&
                !this.corrects.some(c => c.letter === tile.letter && c.index === index)
            ) {
                this.corrects.push({ letter: tile.letter, index });
            }

            if (
                tile.state === 'present' &&
                !this.present.some(p => p.letter === tile.letter && p.index === index)
            ) {
                this.present.push({ letter: tile.letter, index });
            }
        });

        guess.forEach(tile => {
            if (
                tile.state === 'absent' &&
                !this.corrects.some(c => c.letter === tile.letter) &&
                !this.present.some(p => p.letter === tile.letter)
            ) {
                this.incorrect.add(tile.letter);
            }
        });
    }
}
