const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    siteId: {
        type: mongoose.Schema.ObjectId,
        ref: 'HeritageSite',
        required: true
    },
    siteName: String,
    projection: [{
        year: Number,
        integrity: Number
    }],
    riskFactors: Array,
    savedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Prediction', PredictionSchema);
