const express = require("express");
const movieController = require("../controllers/movie");
const reservationController = require("../controllers/reservation");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();

router.get(
    "/my-reservations",
    isAuth,
    reservationController.getUserReservations
);
router.delete(
    "/cancel/:reservationId",
    isAuth,
    reservationController.cancelReservation
);
router.post(
    "/all-reservations",
    isAuth,
    reservationController.getAllReservations
);
router.post("/:showtimeId", isAuth, reservationController.createReservation);

module.exports = router;
