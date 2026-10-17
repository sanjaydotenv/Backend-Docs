import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";

export default function (httpServer) {
  const io = new Server(httpServer);

  io.use((socket, next) => {
    const token = socket.handshake.headers?.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const decoded = verifyToken(token, "access");

      socket.user = decoded;
      next();
    } catch (err) {
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.email);
    console.log("Total connected sockets:", io.engine.clientsCount);

    socket.on("message", (msg) => {
      console.log("Message received:", msg);

      console.log("Connected sockets at message time:", io.engine.clientsCount);

      socket.broadcast.emit("message", {
        ...msg,
        email: socket.user.email,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.email);
    });
  });
}
