const Artifact = require('../models/Artifact');

// @desc    Get all artifacts
// @route   GET /api/artifacts
// @access  Public
exports.getArtifacts = async (req, res) => {
    try {
        const { type, search } = req.query;
        let query = {};

        if (type && type !== 'All') {
            query.type = type;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const artifacts = await Artifact.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: artifacts.length, data: artifacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single artifact
// @route   GET /api/artifacts/:id
// @access  Public
exports.getArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findById(req.params.id);
        if (!artifact) {
            return res.status(404).json({ success: false, message: 'Artifact not found' });
        }
        res.status(200).json({ success: true, data: artifact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new artifact
// @route   POST /api/artifacts
// @access  Private/Admin
exports.createArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.create(req.body);
        res.status(201).json({ success: true, data: artifact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update artifact
// @route   PUT /api/artifacts/:id
// @access  Private/Admin
exports.updateArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!artifact) {
            return res.status(404).json({ success: false, message: 'Artifact not found' });
        }
        res.status(200).json({ success: true, data: artifact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete artifact
// @route   DELETE /api/artifacts/:id
// @access  Private/Admin
exports.deleteArtifact = async (req, res) => {
    try {
        const artifact = await Artifact.findByIdAndDelete(req.params.id);
        if (!artifact) {
            return res.status(404).json({ success: false, message: 'Artifact not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get stats
// @route   GET /api/artifacts/stats
// @access  Public
exports.getStats = async (req, res) => {
    try {
        const total = await Artifact.countDocuments();
        const pending = await Artifact.countDocuments({ status: 'Pending' });
        const verified = await Artifact.countDocuments({ status: 'Verified' });

        res.status(200).json({
            success: true,
            data: {
                totalArtifacts: total,
                pendingReviews: pending,
                verifiedRecords: verified,
                historicalAccuracy: '99.9%'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
