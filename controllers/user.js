const User = require("../models/user");

exports.promoteUser = async (req, res, next) => {
    try {
        if (req.role !== "admin") {
            const error = new Error(
                "Unauthorized - Only admins can promote users"
            );
            error.statusCode = 401;
            throw error;
        }

        const userId = req.params.userId;
        if (!userId) {
            const error = new Error("User ID is required");
            error.statusCode = 400;
            throw error;
        }

        const user = await User.findById(userId);
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        if (user.role === "admin") {
            const error = new Error("User is already an admin");
            error.statusCode = 400;
            throw error;
        }

        user.role = "admin";
        await user.save();

        res.status(200).json({
            message: "User promoted to admin successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};
