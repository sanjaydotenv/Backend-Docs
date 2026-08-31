const express = require("express");
const postController = require("../../src/controllers/post.controller");
const upload = require("../../src/config/multer");

const route = express.Router();

route.post(
  "/create",
  upload.single("image"),
  postController.createPostcontroller,
);

route.get("/getAll-Posts", postController.getAllPostsController);

module.exports = route;
