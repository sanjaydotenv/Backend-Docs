import server from "./src/app.js";
import { createServer } from "node:http";
import initializeSocket from "./src/sockets/socket.server.js"

const httpServer = createServer(server)
initializeSocket(httpServer)

httpServer.listen(3000, () => {
  console.log("server is running on port 3000");
});
