const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}NotesApp`);
    console.log(`DB Connected Successfully`)
  } catch (error) {
    console.log(`Error while Connecting DB ${error}`);
  }
};


module.exports = connectDB