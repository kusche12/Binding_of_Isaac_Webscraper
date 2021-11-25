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
async function scrapeItem(itemNames, db) {
    console.log(db);
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // for (let i = 0; i < itemNames.length; i++) {
    //     if (itemNames[i]) {
    //         console.log('Going to page ' + itemNames[i]);
    //         await page.goto(BASE_URL + itemNames[i].replace(" ", "_"));

    //         // Check to see if this item page exists. If not, then iterate next
    //         let notAnItem = await page.evaluate(() => {
    //             let el = document.querySelector('.noarticletext');
    //             return el;
    //         });
    //         if (isEmpty(notAnItem)) break;

    //         // Scrape and clean to check if the item is active or passive
    //         const [el] = await page.$x('//*[@id="mw-content-text"]/div/p[3]');
    //         const txt = await el.getProperty('textContent');
    //         const isActive = await txt.jsonValue();
    //         const isActiveClean = cleanText(isActive);
    //         let isActiveBool = true;
    //         if (isActiveClean.includes('passive')) isActiveBool = false;

    //         // Get and clean the item trivia
    //         let triviaListArray = [];
    //         const [el2] = await page.$x('//*[@id="mw-content-text"]/div/ul[5]');

    //         // If there is no list of trivia, then it is a paragraph. Grab that instead
    //         if (el2 === undefined) {
    //             const [el3] = await page.$x('//*[@id="mw-content-text"]/div[1]/p[4]');
    //             const txt3 = await el3.getProperty('textContent');
    //             const txt3JSON = await txt3.jsonValue();
    //             const txt3Clean = cleanText(txt3JSON);
    //             triviaListArray.push(txt3Clean);
    //         } else {
    //             const triviaList = await el2.$x("li");
    //             for (let line of triviaList) {
    //                 const lineTxt = await page.evaluate(el => el.innerHTML, line);
    //                 const lineTxtClean = cleanText(lineTxt)
    //                 triviaListArray.push(lineTxtClean);
    //             }
    //         }
    //     }
    // }

    browser.close();
}

async function deleteAllItems() {
    console.log('delete all items');
}

async function main(db) {
    const itemNames = await scrapeItemPage(BASE_URL + 'Items');
    // await scrapeItem(itemNames);
    await scrapeItem(['Box of Spiders'], db);
    // await scrapeItem(['Ball of Bandages']);
}

module.exports = { main, deleteAllItems };