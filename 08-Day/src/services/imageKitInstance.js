const imageKit = require("imagekit");

const imageKitInstance = new imageKit({
  urlEndpoint: process.env.IMAGE_KIT_END_POINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

const uploadFileOnImageKit = async (file, fileName) => {
  const obj = {
    file,
    fileName,
    folder: "firstTime",
  };

  return await imageKitInstance.upload(obj);
};

module.exports = uploadFileOnImageKit;
