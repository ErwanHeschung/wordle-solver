import * as fs from "fs";
import { assetPath } from "./utils/assetUtils";
import { getBestStarter, getBestWordByFrequency, getUpdatedWordList } from "./utils/solverUtils";
import { writeWord, readRowFeedback, playWordle } from "./utils/WordleScrape";
import { GameState } from "./utils/gameState";

let words = fs.readFileSync(assetPath("valid-wordle-words.txt"), "utf-8")
    .split("\n")
    .map(w => w.trim())
    .filter(Boolean);

const maxRetries = 6;

async function runSolver() {
    const page = await playWordle();

    let nextWord = getBestStarter();
    if (!nextWord) return;

    const gameState: GameState = new GameState();

    for (let retry = 0; retry < maxRetries; retry++) {
        console.log(`Try #${retry + 1}: guessing "${nextWord}"`);

        await writeWord(page, nextWord);

        const tiles = await readRowFeedback(page, retry + 1);
        gameState.addGuess(tiles);

        console.log("Feedback:", tiles.map(t => t.state).join(" "));

        const isCorrect = tiles.every(t => t.state === "correct");
        if (isCorrect) {
            console.log(`Wordle solved! Word is "${nextWord}"`);
            break;
        }

        words = getUpdatedWordList(gameState,words);
        nextWord = getBestWordByFrequency(words);

        if (retry === maxRetries - 1) {
            console.log(`Max retries reached. Last guess was "${nextWord}"`);
        }
    }
}

runSolver();
