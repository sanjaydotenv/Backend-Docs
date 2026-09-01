import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}checkAuth`);
    console.log("DB is Connected");
  } catch (error) {
    console.log("Error in Db Connection", error.message);
  }
};

export default connectDB;
