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

export default route;
