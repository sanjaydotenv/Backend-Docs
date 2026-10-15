import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", () => {
    console.log("Connected");
  });
}
