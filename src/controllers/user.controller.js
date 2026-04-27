const userService = require('../services/user.service');
const kpiService = require('../services/kpi.service');

exports.register = async (req, res) => {
    try {
        const [username, password, confirmPassword] = [req.body.username, req.body.password, req.body.confirmPassword];
        const result = await userService.register(username, password, confirmPassword);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        })
    }
}
exports.login = async (req, res) => {
    try {
        const [username, password] = [req.body.username, req.body.password];
        const result = await userService.login(username, password);
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: process.env.ENVIRONMENT === "prod" ? true : false,
            sameSite: process.env.ENVIRONMENT === "prod" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            status: "true",
            comment: result.comment
        });
    }
    catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        })
    }
}
exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            status: "true",
            comment: "Logout successfully!"
        });
    }
    catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        })
    }
}
exports.addAppeniD = async (req, res) => {
    try {
        const { appenid } = req.body;
        const id = req.user.user._id;
        const result = await userService.addAppeniD(id, appenid);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        })
    }
}
exports.me = async (req, res) => {
    try {
        const id = req.user.user._id;
        const result = await userService.me(id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        })
    }
}