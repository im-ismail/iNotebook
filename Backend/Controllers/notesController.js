const Notes = require('../Models/notesSchema');

// Creating or adding new notes related to specific useer
const createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNotes = new Notes({
            user: req.userId, tag, title, description
        });
        const savedNotes = await newNotes.save();
        res.status(201).send(savedNotes);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

// Fetching and sending all notes related to same user
const getNote = async (req, res) => {
    try {
        const allNotes = await Notes.find({ user: req.userId })
        if (allNotes.length < 1) {
            return res.status(404).send('No notes found, try to create a note first');
        }
        res.status(200).send(allNotes);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

// Updating specific notes requested by user
const updateNote = async (req, res) => {
    try {
        const { tag, title, description } = req.body;
        const noteId = req.params.id;
        // Checking and assigning user requested details to be updated
        const newNote = {};
        if (tag) { newNote.tag = tag };
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        // Finding note
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).send('Note not found');
        };
        // Checking if user is genuine or not
        if (note.user.toString() !== req.userId) {
            return res.status(401).send('Authorization failed')
        };
        // Updating note
        const updatedNote = await Notes.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        res.status(200).send(updatedNote);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

// Deleting a note based on user request
const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        // Finding note
        const note = await Notes.findById(noteId);
        if (!note) {
            return res.status(404).send('Note not found');
        };
        // Checking if user is genuine or not
        if (note.user.toString() !== req.userId) {
            return res.status(401).send('Authorization failed');
        }
        // Deleting note
        await Notes.findByIdAndDelete(noteId);
        res.status(200).send('Note has been deleted succesfully');
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error);
    };
};

module.exports = { createNote, getNote, updateNote, deleteNote };