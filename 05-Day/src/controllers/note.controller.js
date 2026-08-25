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

module.exports = { createNoteController };
