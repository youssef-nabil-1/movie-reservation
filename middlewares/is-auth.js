const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const err = new Error("token not found");
        err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        throw err;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    req.email = decoded.email;
    next();
};
