const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['climate_risk', 'urbanization_impact', 'tourism_pressure', 'preservation_progress', 'city_stat', 'global_trend'],
    },
    label: {
        type: String,
        required: false,
    },
    name: {
        type: String,
    },
    category: {
        type: String,
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
