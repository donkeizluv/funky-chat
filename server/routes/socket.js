const express = require("express");
const router = express.Router();
const controller = require("../controllers/socket");

router.get("/id", controller.socket_id);
module.exports = router;
