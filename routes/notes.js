const router = require('express').Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Note = require('../Models/Note');
const mongoose = require('mongoose');

// Get all the notes using: GET "/api/notes/fetchAllNotes". Login required
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
        try {
                // FInd all notes for the logged in user
                let notes = await Note.find({ user: req.user.id });

                // Send the notes to the client
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

                // Find note if it already exists
                let note = await Note.findOne({ title: req.body.title, user: req.user.id });
                if (note) return res.status(400).json({ error: "Sorry a note with this title already exists" });

                // Create a new note
                note = new Note({
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag,
                        user: req.user.id
                });

                // Save the note to the database
                const savedNote = await note.save();

                // Send the response
                res.status(200).send(savedNote);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

// Update a note using: PUT "/api/notes/updateNote". Login required
router.put('/updateNote/:id', fetchUser, [
        body('title', 'Title must be atleast 3 characters long').isLength({ min: 3 }),
        body('description', 'Description must be atleast 3 characters long').isLength({ min: 3 }),
], async (req, res) => {
        try {
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

                // Validate the ObjectId
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                        return res.status(400).json({ error: "Please provide a valid note id" });
                }

                // Update a note if it exists
                let note = await Note.updateOne({ _id: req.params.id, user:req.user.id }, {
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag
                });

                // Send the response
                res.status(200).send(note);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

// Delete a note using: DELETE "/api/notes/deleteNote". Login required
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
        try {
                // Validate the ObjectId
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                        return res.status(400).json({ error: "Please provide a valid note id" });
                }

                // Update a note if it exists
                let note = await Note.deleteOne({ _id: req.params.id, user:req.user.id }, {
                        title: req.body.title,
                        description: req.body.description,
                        tag: req.body.tag
                });

                // Send the response
                res.status(200).send(note);
        } catch (error) {
                res.status(500).send({
                        msg: 'An internal server error occured',
                        Error: error
                })
        }
})

module.exports = router