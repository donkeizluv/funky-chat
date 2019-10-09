const User = require("../models/user");
const uuidv1 = require("uuid/v1");
const { ValidationError } = require("../errors/server-errors");

exports.create = async data => {
  if (await User.findByUsername(data.username).exec()) {
    throw new ValidationError("Username already exists");
  }
  let message = new User({
    userId: uuidv1(),
    username: data.username,
    pwd: data.pwd,
    timestamp: Date.now()
  });
  return message.save();
};

exports.getUser = async cred => {
  return await User.validate(cred).exec();
};

exports.exists = async username => {
  return !!(await User.findByUsername(username).exec());
};
