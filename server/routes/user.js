const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

router.get("/exists", controller.exists);

router.post("/create", controller.create);

router.post("/getuser", controller.getUser);

module.exports = router;
