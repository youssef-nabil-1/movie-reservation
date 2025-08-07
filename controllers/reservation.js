const Movie = require("../models/movie");
const Showtime = require("../models/showtime");
const Reservation = require("../models/reservation");

exports.createReservation = async (req, res, next) => {
    try {
        const showtimeId = req.body.showtimeId;
        const seats = req.body.seats;

        if (!showtimeId || !seats) {
            const error = new Error("Missing required fields");
            error.statusCode = 400;
            throw error;
        }

        const showtime = await Showtime.findById(showtimeId);
        if (!showtime) {
            const error = new Error("Showtime not found");
            error.statusCode = 404;
            throw error;
        }

        if (showtime.capacity < seats) {
            const error = new Error("Seats unavailable");
            error.statusCode = 406;
            throw error;
        }

        const movie = showtime.movie.toString();
        const totalPrice = seats * showtime.price;

        showtime.capacity -= seats;
        await showtime.save();

        const reservation = new Reservation({
            movie,
            showtime: showtimeId,
            seats,
            totalPrice,
            user: req.userId,
        });

        const result = await reservation.save();
        res.status(201).json({ message: "Seats reserved", reservation });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getUserReservations = async (req, res, next) => {
    const userId = req.userId;
    try {
        const reservations = await Reservation.find({ user: userId })
            .populate("movie", "title posterUrl")
            .populate("showtime", "date time price")
            .sort({ "showtime.date": -1 })
            .exec();

        if (!reservations) {
            const error = new Error("No reservations found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "Reservations fetched successfully",
            reservations: reservations,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.cancelReservation = async (req, res, next) => {
    try {
        const reservationId = req.params.reservationId;

        if (!reservationId) {
            const error = new Error("Reservation ID is required");
            error.statusCode = 400;
            throw error;
        }

        // Find reservation and check if it's upcoming
        const reservation = await Reservation.findById(reservationId).populate(
            "showtime",
            "date time"
        );

        if (!reservation) {
            const error = new Error("Reservation not found");
            error.statusCode = 404;
            throw error;
        }

        const showtimeDate = new Date(reservation.showtime.date);
        if (showtimeDate < new Date()) {
            const error = new Error("Cannot cancel past reservations");
            error.statusCode = 400;
            throw error;
        }
        if (!reservation) {
            const error = new Error("Reservation not found");
            error.statusCode = 404;
            throw error;
        }

        if (reservation.user.toString() !== req.userId.toString()) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        const showtime = await Showtime.findById(reservation.showtime);
        if (!showtime) {
            const error = new Error("Showtime not found");
            error.statusCode = 404;
            throw error;
        }

        showtime.capacity += reservation.seats;
        await showtime.save();

        await Reservation.findByIdAndDelete(reservationId);

        res.status(200).json({
            message: "Reservation canceled successfully",
            canceledReservation: reservation,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.getAllReservations = async (req, res, next) => {
    if (req.role !== "admin") {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }
    try {
        const reservations = await Reservation.find()
            .populate("movie", "title posterUrl")
            .populate("showtime", "date time price")
            .sort({ "showtime.date": -1 })
            .exec();

        if (!reservations) {
            const error = new Error("No reservations found");
            error.statusCode = 404;
            throw error;
        }

        // Calculate total revenue
        let revenue = 0;
        reservations.forEach((r) => {
            revenue += r.totalPrice;
        });
        res.status(200).json({
            message: "Reservations fetched successfully",
            reservations: reservations,
            revenue: revenue,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
