const repo = require("../repo/message");
const codes = require("../const/status-codes");

exports.create = function(req, res, next) {
  repo
    .create({
      userId: req.body.userId,
      username: req.body.username,
      guid: req.body.guid,
      stamp: req.body.stamp,
      mess: req.body.mess
    })
    .then(() => res.sendStatus(codes.OK))
    .catch(err => next(err));
};

exports.all = function(req, res) {
  repo
    .all()
    .then(docs => res.json(docs))
    .catch(() => res.sendStatus(codes.INTERNAL_ERROR));
};
