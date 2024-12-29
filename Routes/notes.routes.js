const router = require("express").Router();
const authenticate = require("../Middleware/authenticate");
const { body } = require("express-validator");
const { fetchAllNotes, addNote, updateNote, deleteNote } = require("../Controllers/notes.controller");

// Get all the notes using: GET "/api/notes/fetchAllNotes". Login required
router.get("/fetchAllNotes", authenticate, fetchAllNotes);

// Add a note using: POST "/api/notes/addNote". Login required
router.post("/addNote", authenticate,
  [
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be atleast 3 characters long"
    ).isLength({ min: 3 }),
  ],
  addNote
);

// Update a note using: PUT "/api/notes/updateNote". Login required
router.put("/updateNote/:id", authenticate,
  [
    body("title", "Title must be atleast 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description must be atleast 3 characters long"
    ).isLength({ min: 3 }),
  ],
  updateNote
);

// Delete a note using: DELETE "/api/notes/deleteNote". Login required
router.delete("/deleteNote/:id", authenticate, deleteNote);

module.exports = router;
