const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    site: {
        type: mongoose.Schema.ObjectId,
        ref: 'HeritageSite'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Log', logSchema);
