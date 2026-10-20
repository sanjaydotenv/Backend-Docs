import "dotenv/config";
import server from "../src/app/app.js";
import connectDB from "./config/db.js";

await connectDB();

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
