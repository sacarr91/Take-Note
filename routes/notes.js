const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// READ (GET)
notes.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});


// CREATE (POST) 
notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newnote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newnote, './db/notes.json');
        res.json(`note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// DELETE (DELETE) // adapted from Mini-Project code
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile('./db/notes.json', result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});


module.exports = notes;
