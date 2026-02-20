const mongoose = require('mongoose');

const heritageSiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL'],
    },
    unescoStatus: {
        type: String,
        required: [true, 'Please add UNESCO status'],
    },
    history: {
        type: String,
    },
    historicalData: [{
        year: Number,
        integrity: Number, // 0-100%
        threatLevel: String
    }],
    riskFactors: [{
        factor: String,
        severity: String // High, Medium, Low
    }],
    future2050: {
        preservation: {
            type: String,
            required: true
        },
        impact: {
            type: String,
            required: true
        },
        tourism: {
            type: String,
            required: true
        }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('HeritageSite', heritageSiteSchema);
