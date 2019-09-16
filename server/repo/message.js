var Message = require("../models/message");

exports.create = (data) => {
  var message = new Message({
    userId: data.userId,
    username: data.username,
    guid: data.guid,
    stamp: data.stamp,
    mess: data.mess
  });
  return message.save();
};

exports.all = () => {
  return Message.find({})
    .sort("stamp")
    .limit(100)
    .exec();
};
