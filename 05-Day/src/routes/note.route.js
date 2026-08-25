const epxress = require("express");
const {
  createNoteController,
  getSingleNoteController,
  getAllNotesController
} = require("../controllers/note.controller");

const router = epxress.Router();

router.post("/create", createNoteController);
router.get("/getAllNotes" , getAllNotesController)
router.get("/:noteID", getSingleNoteController);

module.exports = router;
