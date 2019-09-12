const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 6969;
server.listen(PORT);

const users = [];
const connections = [];

io.sockets.on('connection',(socket) => {
   connections.push(socket);
   console.log(' %s sockets is connected', connections.length);

   socket.on('disconnect', () => {
      connections.splice(connections.indexOf(socket), 1);
   });

   socket.on('sending message', (data) => {
      console.log('Message is received from :', data.username);
      io.sockets.emit('newMessage', data);
   });
});

app.use(require("./middlewares/static")(path.join(__dirname, "/ui/funky-chat/dist")));