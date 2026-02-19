const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['city_stat', 'global_trend'],
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    category: String,
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Metric', MetricSchema);
