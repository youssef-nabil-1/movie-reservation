const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middlewares/is-auth");
const router = express.Router();

router.put("/:userId/promote", isAuth, userController.promoteUser);

module.exports = router;
