const router = require('express').Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../Models/Note');

// Get all the notes using: GET "/api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
        try {
                // Create a new note
                let notes = await Note.find({ user: req.user.id });

                res.status(200).send(notes);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

// Add a note using: POST "/api/notes/addNote". Login required
router.post('/addNote', fetchUser, [
        body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
        body('description', 'Description must be atleast 3 characters long').isLength({ min: 3 }),
], async (req, res) => {
        try {
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

                // Create a new note
                let note = await Note.findOne({ title: req.body.title });
                if (note) return res.status(400).json({ error: "Sorry a note with this title already exists" });
                note = new Note({
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag,
                        user: req.user.id
                });
                // Save the note to the database
                const savedNote = await note.save();

                res.status(200).send(savedNote);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

module.exports = router