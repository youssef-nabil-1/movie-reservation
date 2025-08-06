const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
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
    movie: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
});
module.exports = mongoose.model("Showtime", showtimeSchema);
