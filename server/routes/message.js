const express = require("express");
const router = express.Router();

const controller = require("../controllers/message");

router.get("/all", controller.all);

router.post("/create", controller.create);

// router.get('/:id', message_controller.message_details);

// router.put('/:id/update', message_controller.message_update);

// router.delete('/:id/delete', message_controller.message_delete);

module.exports = router;
