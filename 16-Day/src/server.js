const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("a new user connected");

  socket.on("disconnect", () => {
    console.log("a new user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("server is running");
});
