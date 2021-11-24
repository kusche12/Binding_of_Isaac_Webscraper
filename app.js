// Run the app with `nodemon app.js` and navigate to /scraper
const express = require('express');
const path = require('path');
const { main, deleteAllItems } = require('./scrapers.js');
const port = 3000;

const app = express();

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