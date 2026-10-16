import { Server } from "socket.io";

export default function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Connected");

    socket.on("u1" , (data) => {
      console.log(data)

      socket.emit("i am listening")
    })


    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
}
