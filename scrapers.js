const puppeteer = require('puppeteer');
const BASE_URL = 'https://bindingofisaacrebirth.fandom.com/wiki/';
const { cleanText, isEmpty } = require('./functions.js');

// Scrape the items page to get the names of all items that appear in the row
// returns an arrray of item names
async function scrapeItemPage(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const items = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('table tbody tr')).map(item => {
            if (item.querySelector('td')) {
                return item.querySelector('td').getAttribute('data-sort-value');
            }
        });
    });

    browser.close();
    return items;
}

// Scrape the individual item for more detail
async function scrapeItem(itemNames) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let i = 0; i < itemNames.length; i++) {
        if (itemNames[i]) {
            console.log('Going to page ' + itemNames[i]);

            await page.goto(BASE_URL + itemNames[i].replace(" ", "_"));

            // Check to see if this item page exists. If not, then iterate next
            let notAnItem = await page.evaluate(() => {
                let el = document.querySelector('.noarticletext');
                return el;
            });

            if (isEmpty(notAnItem)) break;

            // Get and clean the item header
            const [el] = await page.$x('//*[@id="firstHeading"]');
            const txt = await el.getProperty('textContent');
            const firstHeading = await txt.jsonValue();
            const firstHeadingClean = cleanText(firstHeading);

            // Get and clean the item trivia
            const [el2] = await page.$x('//*[@id="mw-content-text"]/div/ul[5]');
            const triviaList = await el2.$x("li");
            for (let line of triviaList) {
                const lineTxt = await page.evaluate(el => el.innerHTML, line);
                const lineTxtClean = cleanText(lineTxt)
                console.log(lineTxtClean);
            }
        }
    }

    browser.close();
}

async function main() {
    // const itemNames = await scrapeItemPage(BASE_URL + 'Items');
    // await scrapeItem(itemNames);
    await scrapeItem(['A Pony']);
}

main();