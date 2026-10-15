import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Connected");

    io.on("u1" , () => {
        console.log("User One Listening")
    })


    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
}
