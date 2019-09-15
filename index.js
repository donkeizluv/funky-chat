/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const socketActions = require("./server/const/socketAction");

// configs
const PORT = process.env.PORT || 8000;
const MESSAGE_LIMIT = 500;

// init
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
server.listen(PORT);
console.log(`${new Date()} - App started on ${PORT}...`);

// middlewares
app.use(require("./server/middlewares/compress"));
app.use(require("./server/middlewares/cors"));
app.use(require("./server/middlewares/static")(path.join(__dirname, "/dist")));

// routes
app.get("/messages", (req, res) => res.json(messages));
app.get("/users", (req, res) => res.json(users));

// vars
const users = [];
const connections = [];
const messages = [];

io.sockets.on("connection", socket => {
  connections.push(socket);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });

  // broacasts
  socket.on(socketActions.SEND_MESSAGE, data => {
    pushWithLimit(messages, data, MESSAGE_LIMIT);
    io.sockets.emit(socketActions.ON_RECEIVED_MESSAGE, data);
  });

  socket.on(socketActions.SEND_GREETING, data => {
    io.sockets.emit(socketActions.ON_RECEIVED_GREETING, data);
  });
});

function pushWithLimit(array, item, limit) {
  if (Array.isArray(item)) {
    array = array.concat(item);
  } else {
    array.push(item);
  }
  // trim exceeds
  if (limit > 0 && array.length > limit) {
    array.splice(0, array.length - limit);
  }
}
