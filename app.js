// TODO:
// Scrape more data for each item
// Run more items in the scraper

// FYI:
// Run the app with `nodemon app.js` and navigate to /boi-scraper

const express = require('express');
const mongoose = require('mongoose');
const { main } = require('./scrapers.js');
const data = require('./secrets.json');
const port = 3000;

const app = express();

mongoose.connect(data.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log('connected to mongoDB');
    })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/boi-scraper', (req, res) => {
    res.send('Running the Binding of Isaac Webscraper...');
    main();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});