const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    skillLevel: {
        type: Number,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    careerTitle: String,
    projection: Array,
    roadmap: Array,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Prediction', PredictionSchema);
