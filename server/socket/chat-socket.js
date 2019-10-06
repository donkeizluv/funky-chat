const connections = require("./connections");
const messageRepo = require("../repo/message");
const socketActions = require("../const/socketAction");

exports.start = server => {
  let io = require("socket.io").listen(server);
  io.sockets.on("connection", client => {
    connections.push({ id: client.id, socket: client });

    client.send(client.id);

    client.on("disconnect", () => {
      connections.splice(connections.indexOf(client), 1);
    });
    // broacasts
    client.on(socketActions.SEND_MESSAGE, data => {
      // console.log("mess arrived!");
      messageRepo
        .create(data)
        .then(() => {})
        .catch(err => {
          // log
        });
      io.sockets.emit(socketActions.ON_RECEIVED_MESSAGE, data);
    });

    client.on(socketActions.SEND_GREETING, data => {
      // console.log("client connected!");
      io.sockets.emit(socketActions.ON_RECEIVED_GREETING, data);
    });
  });

  return io;
};
