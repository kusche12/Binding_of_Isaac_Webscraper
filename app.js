// TODO: Set up a TLS 2.0 connection to the database
// or else you will keep crashing on attempted connections.

// Run the app with `nodemon app.js` and navigate to /scraper
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const data = require('./secrets.json');
const { main, deleteAllItems } = require('./scrapers.js');
const port = 3000;

// Create connection to database
const db = mysql.createConnection({
    host: data.sqlConfig.host,
    user: data.sqlConfig.user,
    password: data.sqlConfig.password,
    database: data.sqlConfig.database
});

db.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL Connected...");
    }
});


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