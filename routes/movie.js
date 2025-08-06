const express = require("express");
const movieController = require("../controllers/movie");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.post("/create", movieController.createMovie);

module.exports = router;
