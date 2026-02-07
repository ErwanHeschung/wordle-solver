import puppeteer, { Page, Browser } from "puppeteer";
import { Tile, TileState } from "../models/tile";

const worldUrl = "https://www.nytimes.com/games/wordle/index.html";

async function launchWordle(): Promise<{ browser: Browser; page: Page }> {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto(worldUrl, {
        waitUntil: "networkidle2",
    });

    return { browser, page };
}

async function pressPlayButton(page: Page) {
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll("button"));
        const playBtn = buttons.find(
            (b) => b.textContent?.trim().toLowerCase() === "play"
        ) as HTMLElement;
        if (playBtn) playBtn.click();
    });

    await delay(500);
}

async function writeLetter(page: Page, letter: string) {
    const key = letter.toLowerCase();

    await page.evaluate((key) => {
        const button = document.querySelector(`button[data-key="${key}"]`) as HTMLElement;
        if (button) button.click();
    }, key);
}

export async function writeWord(page: Page, word: string) {
    for (const letter of word.toLowerCase()) {
        await writeLetter(page, letter);
    }

    await writeLetter(page, "↵");
}

export async function readRowFeedback(
    page: Page,
    rowNumber: number,
    delayMs = 2000
): Promise<Tile[]> {
    await delay(delayMs);

    return page.evaluate((rowNumber) => {
        const rowDiv = Array.from(document.querySelectorAll(`[aria-label]`)).find(
            (el) => el.getAttribute("aria-label") === `Row ${rowNumber}`
        );

        if (!rowDiv) return [];

        const tiles = Array.from(rowDiv.querySelectorAll("[data-state]")) as HTMLElement[];

        return tiles.map(tile => ({
            letter: tile.textContent?.trim() || "",
            state: tile.getAttribute("data-state") as TileState
        }));
    }, rowNumber);
}

export async function playWordle(): Promise<Page> {
    const { browser, page } = await launchWordle();

    await pressPlayButton(page);
    return page
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
