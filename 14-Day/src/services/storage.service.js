import imagekit from "imagekit";
import { config } from "../config/config.js";

const ImageKit = new imagekit({
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async (buffer, fileName) => {
  const response = await ImageKit.upload({
    file: buffer,
    fileName,
  });

  return response;
};

export default uploadFile;
