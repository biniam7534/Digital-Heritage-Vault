const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['climate_risk', 'urbanization_impact', 'tourism_pressure', 'preservation_progress'],
    },
    label: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Metric', MetricSchema);
