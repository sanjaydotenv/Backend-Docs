const express = require("express");
const app = express();
const notesRouter = require("./routes/note.route");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/notes", notesRouter);

module.exports = app;
