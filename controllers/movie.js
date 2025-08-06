const Movie = require("../models/movie");
const Showtime = require("../models/showtime");

exports.createMovie = async (req, res, next) => {
    if (req.role !== "admin") {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    const title = req.body.title;
    const genre = req.body.genre;
    const description = req.body.description;
    const poster = req.file;

    const movie = new Movie({
        title,
        genre,
        description,
        poster: poster.path.replace("\\", "/"),
    });
    const result = await movie.save();

    res.status(201).json({ message: "Movie created", movie: result });
};

exports.createShowtime = async (req, res, next) => {
    if (req.role !== "admin") {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }

    const date = req.body.date;
    const time = req.body.time;
    const capacity = req.body.capacity;
    const price = req.body.price;
    const movieId = req.params.id;
    console.log(movieId);

    const showtime = new Showtime({
        date: new Date(date),
        time,
        capacity,
        movie: movieId,
        price,
    });
    const result = await showtime.save();
    res.status(201).json({ message: "showtime added", showtime: result });
};

exports.getShowtimes = async (req, res, next) => {
    const movieId = req.params.id;
    const showtimes = await Showtime.find({
        movie: movieId,
    });

    res.status(200).json({ message: "showtimes fetched", showtimes });
};
