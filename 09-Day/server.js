import dotenv from "dotenv";
dotenv.config();
import server from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB()

server.listen(3000, () => {
  console.log("Server is running");
});
