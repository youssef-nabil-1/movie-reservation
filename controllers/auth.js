const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPass, role });
    try {
        const result = await user.save();
        res.status(201).json({
            message: "user created successfully",
            user: result._id,
        });
    } catch (err) {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error("Email is not found");
        err.statusCode = 404;
        throw err;
    }
    const isTrue = await bcrypt.compare(password, user.password);
    if (!isTrue) {
        const err = new Error("Wrong email or password");
        err.statusCode = 401;
        throw err;
    }
    const token = jwt.sign(
        {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        },
        "secretsercjsanjdn",
        { expiresIn: "1h" }
    );
    res.status(202).json({ message: "logged in successfully", token });
};
