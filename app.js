const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const authRouter = require("./routes/auth");
const movieRouter = require("./routes/movie");

dotenv.config();
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./posters");
    },
    filename: function (req, file, cb) {
        if (!fs.existsSync("./posters")) {
            fs.mkdirSync("./posters");
        }
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    }
    cb(null, false);
};

app.use(multer({ storage, fileFilter }).single("poster"));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/movie", movieRouter);

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
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
