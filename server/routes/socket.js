const express = require("express");
const router = express.Router();
const socket_controller = require("../controllers/socket");

router.get("/id", socket_controller.socket_id);
module.exports = router;
