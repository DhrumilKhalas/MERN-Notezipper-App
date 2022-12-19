const express = require("express")
const notesRouter = express.Router()
const notesController = require("../controllers/notesController");
const { protect } = require("../middlewares/authMiddleware");

// get all notes of a particular user
notesRouter.get("/", protect, notesController.getAllNotes)

// create a note
notesRouter.post("/create", protect, notesController.createNote)

// get a single note
notesRouter.get("/:id", notesController.getASingleNoteById)

// update a note
notesRouter.put("/:id", protect, notesController.updateNote)

// delete a note
notesRouter.delete("/:id", protect, notesController.deleteaNote)


module.exports = notesRouter;