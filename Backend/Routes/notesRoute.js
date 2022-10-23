const express = require('express');
const router = express.Router();
const auth = require('../Authentication/authentication');
const { createNote, getNote, updateNote, deleteNote } = require('../Controllers/notesController');

router.post('/create', auth, createNote);
router.get('/get', auth, getNote);
router.put('/update/:id', auth, updateNote);
router.delete('/delete/:id', auth, deleteNote);

module.exports = router;