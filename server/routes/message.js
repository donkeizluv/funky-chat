const express = require("express");
const router = express.Router();

const message_controller = require("../controllers/message");

router.get("/all", message_controller.message_all);

router.post("/create", message_controller.message_create);

// router.get('/:id', message_controller.message_details);

// router.put('/:id/update', message_controller.message_update);

// router.delete('/:id/delete', message_controller.message_delete);

module.exports = router;
