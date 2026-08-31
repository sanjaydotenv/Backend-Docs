const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}useImageKit`);
    console.log("DB Connected");
  } catch (error) {
    console.log("Error While Connecting DB", error.message);
  }
};

module.exports = connectDB;
