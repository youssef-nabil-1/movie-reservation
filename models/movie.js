const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    showtimes: {
        type: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                time: {
                    type: String,
                    required: true,
                },
                capacity: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                availableSeats: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
        default: [],
    },
    revenue: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Movie", movieSchema);
