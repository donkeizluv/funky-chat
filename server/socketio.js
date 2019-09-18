const connections = [];
const messageRepo = require("./repo/message");
const socketActions = require("../server/const/socketAction");

exports.start = server => {
  let io = require("socket.io").listen(server);
  io.sockets.on("connection", socket => {
    connections.push(socket);
    socket.on("disconnect", () => {
      connections.splice(connections.indexOf(socket), 1);
    });
    // broacasts
    socket.on(socketActions.SEND_MESSAGE, data => {
      // console.log("mess arrived!");
      messageRepo
        .create(data)
        .then(() => {})
        .catch(err => {
          // log
        });
      io.sockets.emit(socketActions.ON_RECEIVED_MESSAGE, data);
    });

    socket.on(socketActions.SEND_GREETING, data => {
      // console.log("client connected!");
      io.sockets.emit(socketActions.ON_RECEIVED_GREETING, data);
    });
  });

  return io;
};
