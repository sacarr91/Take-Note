const express = require('express');
const path = require('path');
const api = require('./routes/routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(`${__dirname}/public/index.html`));


// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(`${__dirname}/public/notes.html`));

app.use('/api', api);

// GET Route requested in instructions
app.get('*', (req, res) =>
    res.sendFile(`${__dirname}/public/index.html`));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);