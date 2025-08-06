const express = require("express");
const movieController = require("../controllers/movie");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.post("/create", isAuth, movieController.createMovie);
router.delete("/:id", isAuth, movieController.deleteMovie);
router.post("/:id/showtimes", isAuth, movieController.createShowtime);
router.get("/showtimes/:date", isAuth, movieController.getShowtimesByDate);
router.get("/:id/showtimes", isAuth, movieController.getShowtimes);
module.exports = router;
