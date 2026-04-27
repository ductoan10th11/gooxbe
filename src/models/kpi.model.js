const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
    appen_id: { type: String, required: true },
    job_id: { type: String },
    record_id: { type: String },
    kpi_count: { type: Number, required: true },
    occurred_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('KPI', kpiSchema);
