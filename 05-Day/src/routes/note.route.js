const epxress = require("express");
const {
  createNoteController,
  getSingleNoteController,
} = require("../controllers/note.controller");

const router = epxress.Router();

router.post("/create", createNoteController);
router.get("/:noteID", getSingleNoteController);

module.exports = router;
