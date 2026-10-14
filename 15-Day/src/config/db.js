const config = require("./config.js");
const mongoose = require("mongoose");

module.exports = async function () {
  await mongoose.connect(config.MONGO_URI);

  console.log("Connected to MongoDB");
};
