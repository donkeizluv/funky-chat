const mongoose = require("mongoose");

var user = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  pwd: { type: String, required: true },
  created: { type: Number }
});

user.static("findByUsername", function(username) {
  return this.findOne({ username: username });
});

user.static("validate", function(cred) {
  return this.findOne({ username: cred.username, pwd: cred.pwd });
});

module.exports = mongoose.model("user", user);
