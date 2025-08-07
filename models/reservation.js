const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema(
    {
        movie: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
            required: true,
        },
        showtime: {
            type: Schema.Types.ObjectId,
            ref: "Showtime",
            required: true,
        },
        seats: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Reservation", reservationSchema);
