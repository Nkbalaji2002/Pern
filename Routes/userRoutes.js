const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");

router.get("/", userController.getUsers);
router.post("/", userController.addUsers);
router.put("/:id", userController.updateUsers);
router.delete("/:id", userController.deleteUsers);

module.exports = router;
