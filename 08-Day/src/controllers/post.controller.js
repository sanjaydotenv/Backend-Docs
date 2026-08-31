const uploadFileOnImageKit = require("../services/imageKitInstance");
const postModel = require("../../src/models/post.model");

const createPostcontroller = async (req, res) => {
  const { userName, caption } = req.body;
  const file = req.file;

  if (!userName || !caption || !file) {
    return res.status(400).json({
      success: false,
      message: "Soemthing was missing",
    });
  }

  const image = await uploadFileOnImageKit(file.buffer, file.originalname);

  if (!image) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }

  console.log(image);

  const postCreated = await postModel.create({
    userName,
    caption,
    image: image.url,
  });

  return res.status(201).json({
    success: true,
    message: "Post Created Successfully",
    POST: postCreated,
  });
};

const getAllPostsController = async (req, res) => {
  const allPosts = await postModel.find();

  res.status(200).json({
    success: true,
    message: "All Posts Fetched Successfullt",
    POSTS: allPosts,
  });
};

module.exports = { createPostcontroller, getAllPostsController };
