const mongoose = require('mongoose');

const artifactSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    type: {
        type: String,
        required: [true, 'Please specify type (Artifact, Document, Audio)'],
        enum: ['Artifact', 'Document', 'Audio'],
        default: 'Artifact',
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    },
    date: {
        type: String,
        required: [true, 'Please add a historical era/date'],
    },
    origin: {
        type: String,
        required: [true, 'Please specify origin (Culture/Empire)'],
    },
    description: {
        type: String,
        required: [true, 'Please add a historical description/context'],
    },
    referenceId: {
        type: String,
        unique: true,
        default: () => `0x${Math.floor(Math.random() * 10000).toString(16).toUpperCase()}AF`,
    },
    status: {
        type: String,
        enum: ['Verified', 'Pending', 'Archived'],
        default: 'Pending',
    },
    archivist: {
        type: String,
        default: 'Main Curator',
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Artifact', artifactSchema);
