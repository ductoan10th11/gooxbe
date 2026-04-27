const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.auth = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: "false",
                comment: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                status: "false",
                comment: "Unauthorized: User not found"
            });
        }

        req.user = { user };
        next();
    } catch (err) {
        return res.status(401).json({
            status: "false",
            comment: "Unauthorized: Invalid token"
        });
    }
};
