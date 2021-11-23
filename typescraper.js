const puppeteer = require('puppeteer');
const BASE_URL = 'https://typing-speed-test.aoeu.eu/';

async function main() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(BASE_URL);

    await page.waitForSelector('.nextword');
    const words = await page.evaluate(() => {
        const wordElements = document.querySelectorAll('.nextword');
        const wordList = [document.querySelector('.currentword').innerText];

        wordElements.forEach((word) => {
            wordList.push(word.innerText);
        });

        return wordList;
    });

    for (let i = 0; i < words.length; i++) {
        await page.type('#input', words[i]);
        await page.keyboard.press(String.fromCharCode(32));
    }


};

main();