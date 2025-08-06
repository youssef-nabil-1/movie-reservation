const Movie = require("../models/movie");

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
