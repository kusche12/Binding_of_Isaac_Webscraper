// TODO:
// Scrape more data for each item
// Run more items in the scraper

// FYI:
// Run the app with `nodemon app.js` and navigate to /boi-scraper

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { main, deleteAllItems } = require('./scrapers.js');
const data = require('./secrets.json');
const port = 3000;

// async function connectToServer() {
//     const db = await mongoose.connect(data.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
//         .then((res) => {
//             console.log('connected to mongoDB');
//         })
//         .catch((err) => console.log(err));
//     console.log(this);
// }

const app = express();

mongoose.connect(data.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log('connected to mongoDB');
    })
    .catch((err) => console.log(err));

// connectToServer();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

app.get('/scraper', (req, res) => {
    res.send('Running the Binding of Isaac Webscraper...');
    main();
});

app.get('/delete', (req, res) => {
    res.send('Deleting all documents from BOI Items Collection...');
    deleteAllItems();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});