import { GameState } from "./gameState";

export function getBestStarter(): string {
    return "salet";
}

export function getUpdatedWordList(gameState: GameState, words: string[]): string[] {
    return words.filter(word => {
        for (const { letter, index } of gameState.corrects) {
            if (word[index] !== letter) return false;
        }

        for (const { letter, index } of gameState.present) {
            if (!word.includes(letter)) return false;
            if (word[index] === letter) return false;
        }

        for (const letter of gameState.incorrect) {
            if (word.includes(letter)) return false;
        }

        return true;
    });
}

export function getBestWordByFrequency(words: string[]): string {
    if (words.length <= 2) return words[0];

    const freq: Record<string, number> = {};
    for (const word of words) {
        for (const char of new Set(word)) { 
            freq[char] = (freq[char] || 0) + 1;
        }
    }

    return words.reduce((bestWord, currentWord) => {
        const currentScore = currentWord.split('')
            .reduce((sum, char) => sum + (freq[char] || 0), 0);

        const bestScore = bestWord.split('')
            .reduce((sum, char) => sum + (freq[char] || 0), 0);

        return currentScore > bestScore ? currentWord : bestWord;
    }, words[0]);
}