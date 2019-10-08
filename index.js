/* eslint-disable no-console */
require('dotenv').config()
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
// configs
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const connStr = process.env.MONGODB_URI
// init
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const server = require("http").createServer(app);
require("./server/socketio").start(server);
//db
mongoose.connect(connStr, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("connected to mongo db");
// });
//start
server.listen(PORT);
console.log(`${new Date()} - App started on ${PORT}...`);

// middlewares
app.use(require("./server/middlewares/compress"));
app.use(require("./server/middlewares/cors"));
app.use(require("./server/middlewares/static")(path.join(__dirname, "/dist")));

// routes
app.use("/api/message", require("./server/routes/message"));
app.use("/api/user", require("./server/routes/user"));