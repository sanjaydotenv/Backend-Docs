const notesModel = require("../models/note.model");

const createNoteController = async (req, res) => {
  const { title, description } = req.body;
  try {
    const createdNote = await notesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Note Created Successfully",
      Note: createdNote,
    });
  } catch (error) {
    console.log(`Error while creating a note ${error}`);
  }
};

const getSingleNoteController = async (req, res) => {
  const { noteID } = req.params;
  console.log(noteID);
  try {
    const singleNote = await notesModel.findById(noteID);

    res.status(200).json({
      message: "Single Note Fetched Successfully",
      singleNote: singleNote,
    });
  } catch (error) {
    console.log(`Error while Fetching a single note`);
  }
};

module.exports = { createNoteController, getSingleNoteController };
