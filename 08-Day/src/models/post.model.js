const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
