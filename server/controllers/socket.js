const codes = require("../const/status-codes");
const connections = require("../socket/connections");

exports.socket_id = (req, res) => {
  let id = req.cookies.io;
  if (!id) {
    res.sendStatus(codes.BAD_REQUEST);
  }
  let con = connections.find(c => c.id === id);
  if (con) {
    res.json({ id: con });
  } else {
    res.sendStatus(codes.BAD_REQUEST);
  }
};
