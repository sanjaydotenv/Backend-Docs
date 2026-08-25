const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI_KEY}Notes`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Error is DB Connection ${error}`);
  }
};

module.exports = connectDB;
