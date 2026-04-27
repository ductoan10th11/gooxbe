const kpiService = require('../services/kpi.service');

exports.createKPI = async (req, res) => {
    try {
        const result = await kpiService.createKPI(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        });
    }
};

exports.getKPI = async (req, res) => {
    try {
        const id = req.user.user._id;
        const result = await kpiService.getKPI(id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            status: "false",
            comment: err.message
        });
    }
};
