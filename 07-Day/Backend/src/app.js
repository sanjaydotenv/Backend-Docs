const express = require("express");
const upload = require("../multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => {
  res.send("Get Request");
});

app.post("/uploadFile", upload.array("image" , 5), (req, res) => {
  const body = req.body;
  const files = req.files;

  console.log("Body -> ", body);
  console.log("Files -> ", files);

  res.status(201).json({
    message: "File Uploaded Successfully",
  });
});


module.exports = app;
