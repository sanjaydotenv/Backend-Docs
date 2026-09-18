import express from "express";
import { generateCode } from "../utils/generateCode.js";
import urlModel from "../models/url.model.js";

const route = express.Router();

route.post("/", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      message: "url is required",
    });
  }

  if (
    url.startsWith("http://") == false &&
    url.startsWith("https://") == false
  ) {
    return res.status(401).json({
      message: "enter a valid url",
    });
  }

  const code = generateCode();

  console.log(code);

  const newUrl = await urlModel.create({
    originalUrl: url,
    shortCode: code,
  });

  return res.status(201).json({
    message: "URL shortened successfully",
    data: {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
    },
  });
});

route.get("/", async (req, res) => {
  const urls = await urlModel.find();

  return res.status(200).json({
    message: "URLs fetched successfully",
    data: {
      urls,
    },
  });
});

route.delete("/:code", async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({
        message: "Short Code is required",
      });
    }

    const url = await urlModel.findOneAndDelete({
      shortCode: code,
    });

    if (!url) {
      return res.status(404).json({
        message: "url not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
      data: url,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete URL",
    });
  }
});

export default route;
