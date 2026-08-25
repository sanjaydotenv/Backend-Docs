const epxress = require("express");
const {
  createNoteController,
  getSingleNoteController,
  getAllNotesController,
  updateNoteController,
  deleteNoteController
} = require("../controllers/note.controller");

const router = epxress.Router();

router.post("/create", createNoteController);
router.get("/getAllNotes" , getAllNotesController)
router.get("/:noteID", getSingleNoteController);
router.put("/:noteID", updateNoteController)
router.delete("/:noteID" , deleteNoteController)

module.exports = router;
