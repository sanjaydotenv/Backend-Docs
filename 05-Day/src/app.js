const express = require("express");
const app = express();
const notesRouter = require("./routes/note.route");

app.use(express.json());

app.use("/notes", notesRouter);

module.exports = app;
