const multer = require("multer");
const path = require("path");

const diskStoare = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});

const upload = multer({ storage: diskStoare });

module.exports = upload;
