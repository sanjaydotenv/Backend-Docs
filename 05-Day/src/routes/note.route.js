const epxress = require("express");
const { createNoteController } = require("../controllers/note.controller");

const router = epxress.Router();

router.post("/create", createNoteController);

module.exports = router;
