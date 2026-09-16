import server from "./app/app.js";
import { config } from "./config/config.js";
import connectDB from "./config/db.js";

await connectDB();

const PORT = config.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
