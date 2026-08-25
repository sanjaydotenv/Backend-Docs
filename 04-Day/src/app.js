const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("get api ");
});

app.post("/create", async (req, res) => {
  const { title, description } = req.body;

  const createdNote = await noteModel.create({
    title,
    description,
  });

  res.send({
    success: true,
    message: "Note Created Successfully",
    data: createdNote,
  });
});

module.exports = app;
