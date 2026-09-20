import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${config.MONGO_URI}`);
    console.log("DataBase Connected Successfully");
  } catch (error) {
    console.log(`Error during connecting to DB ${error.message}`);
  }
};


export default connectToDB