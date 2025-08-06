const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use("/auth", authRouter);

app.use((err, req, res, next) => {
    res.status(err.statusCode).json({ message: err.message });
});

mongoose
    .connect(process.env.MONGO_DB_URI)
    .then((result) => {
        console.log("connected");
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });
