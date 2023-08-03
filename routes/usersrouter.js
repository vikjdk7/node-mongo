const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");
const validator = require("../middlewares/validators");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", validator.validateUser, userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
