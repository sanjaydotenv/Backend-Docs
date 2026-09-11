import server from "./app/app.js";
import { config } from "./config/config.js";
import connectDB from "./config/db.js";

await connectDB();

server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
