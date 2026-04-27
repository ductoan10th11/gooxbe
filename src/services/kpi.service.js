const KPI = require('../models/kpi.model');
const USER = require('../models/user.model');

exports.createKPI = async (kpi) => {
    try {
        const { appen_id, job_id, record_id, kpi_count, occurred_at } = kpi;
        
        // Find if a KPI with same appen_id, job_id and record_id exists
        // If yes, update the kpi_count. If no, create a new one (upsert)
        const savedKPI = await KPI.findOneAndUpdate(
            { appen_id, job_id, record_id },
            { 
                $set: { 
                    kpi_count, 
                    occurred_at: occurred_at || new Date() 
                } 
            },
            { new: true, upsert: true }
        );

        return {
            status: "true",
            comment: "KPI processed successfully!",
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