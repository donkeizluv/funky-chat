/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const socketActions = require("./server/const/socketAction");

const app = express();
app.use(require("./server/middlewares/static")(path.join(__dirname, "/dist")));

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const PORT = process.env.PORT || 8000;
server.listen(PORT);

// const users = [];
const connections = [];

io.sockets.on("connection", socket => {
  connections.push(socket);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });

  // broacasts
  socket.on(socketActions.SEND_MESSAGE, data => {
    io.sockets.emit(socketActions.ON_RECEIVED_MESSAGE, data);
  });

  socket.on(socketActions.SEND_GREETING, data => {
    io.sockets.emit(socketActions.ON_RECEIVED_GREETING, data);
  });
});


