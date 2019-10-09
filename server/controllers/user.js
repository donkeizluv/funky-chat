const repo = require("../repo/user");
const codes = require("../const/status-codes");
const { ValidationError } = require("../errors/server-errors");

exports.create = async (req, res, next) => {
  try {
    await repo.create({
      username: req.body.username,
      pwd: req.body.pwd
    });
    res.sendStatus(codes.OK);
  } catch (ex) {
    if (ex.name && ex.name === ValidationError.NAME) {
      res.sendStatus(codes.BAD_REQUEST);
      return;
    }
    next(ex);
  }
};

exports.getUser = function (req, res) {
  repo
    .getUser(req.body)
    .then(r => res.sendStatus(r ? { userId: r.userId, username: r.username } : codes.FORBIDDEN))
    .catch(() => res.sendStatus(codes.INTERNAL_ERROR));
};

exports.exists = async (req, res) => {
  try {
    let r = await repo.exists(req.query.username);
    res.json({
      exists: r
    });
  } catch (ex) {
    res.sendStatus(codes.INTERNAL_ERROR);
  }
};
