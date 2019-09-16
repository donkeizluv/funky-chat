const mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  guid: { type: String, required: true },
  stamp: { type: Date, required: true },
  mess: { type: String, required: true }
});

module.exports = mongoose.model("Message", messageSchema);
