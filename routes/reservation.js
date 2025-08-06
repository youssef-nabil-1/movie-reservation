const express = require("express");
const movieController = require("../controllers/movie");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

module.exports = router;
