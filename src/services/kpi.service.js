const KPI = require('../models/kpi.model');
const USER = require('../models/user.model');

exports.createKPI = async (kpi) => {
    try {
        const savedKPI = await KPI.create(kpi);
        return {
            status: "true",
            comment: "KPI created successfully!",
            data: savedKPI
        }
    } catch (err) {
        throw err
    }
}
exports.getKPI = async (id) => {
    try {
        const user = await USER.findById(id);
        if (!user) {
            return {
                status: "false",
                comment: "User not found!"
            }
        }
        const kpi = await KPI.find({ appen_id: user.appenid });
        return {
            status: "true",
            comment: "KPI fetched successfully!",
            data: kpi
        }
    } catch (err) {
        throw err
    }
}