const express = require('express');
const path = require('path');
const api = require("./routes/notesRoutes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(`${__dirname}/public/pages/index.html`)
);

app.get('/notes', (req, res) =>
    res.sendFile(`${__dirname}/public/pages/notes.html`)
);

app.get('*', (req, res) =>
res.sendFile(`${__dirname}/public/pages/404.html`))

app.listen(PORT, () =>
console.log(`App is listening at http://localhost:${PORT}`));