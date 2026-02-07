import { GameState } from "./gameState";

export function getWithMostVowel(words: string[]): string | null {
    if (words.length === 0) return null;

    const vowels = new Set(["a", "e", "i", "o", "u"]);

    let maxWord = words[0];
    let maxCount = 0;

    for (const word of words) {
        let count = 0;
        for (const char of word.toLowerCase()) {
            if (vowels.has(char)) count++;
        }

        if (count > maxCount) {
            maxCount = count;
            maxWord = word;
        }
    }

    return maxWord;
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
