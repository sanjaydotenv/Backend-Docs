import server from "./app/app.js";
import connectDB from "./config/db.js";

await connectDB();

server.listen(3000, () => {
  console.log("server is running on port 3000");
});
