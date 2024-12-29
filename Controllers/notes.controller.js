import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Note from "../Models/Note.js";

export const fetchAllNotes = async (req, res) => {
  try {
    // FInd all notes for the logged in user
    let notes = await Note.find({ user: req.user.id });

    // Send the notes to the client
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured",
    });
    console.log("Error in fetching all notes route", error);
  }
}

export const addNote = async (req, res) => {
  try {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      console.log(errors.array());
      return res.status(400).json({
        success: false,
        message: "Validation errors",
      });
    }

    // Find note if it already exists
    let note = await Note.findOne({
      title: req.body.title,
      user: req.user.id,
    });
    if (note)
      return res.status(400).json({
        success: false,
        message: "Sorry a note with this title already exists",
      });
    // Create a new note
    note = new Note({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      user: req.user.id,
    });

    // Save the note to the database
    const savedNote = await note.save();

    // Send the response
    res.status(200).json({ success: true, savedNote });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured",
    });
    console.log("Error in addNote route", error);
  }
}

export const updateNote = async (req, res) => {
  try {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      console.log(errors.array());
      return res.status(400).json({
        success: false,
        message: "Validation errors",
      });
    }

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json(
        { 
          success: false,
          message: "Please provide a valid note id"
        }
      );
    }

    // Update a note if it exists
    let note = await Note.updateOne(
      { _id: req.params.id, user: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      }
    );

    // Send the response
    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured",
    });
    console.log("Error in updateNote/:id route", error);
  }
}

export const deleteNote = async (req, res) => {
  try {
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Please provide a valid note id" });
    }

    // Update a note if it exists
    let note = await Note.deleteOne(
      { _id: req.params.id, user: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      }
    );

    // Send the response
    res.status(200).json({ success: true, note });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An internal server error occured",
    });
    console.log("Error in deleteNote/:id route", error);
  }
}