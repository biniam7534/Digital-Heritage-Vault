const Prediction = require('../models/Prediction');
const Metric = require('../models/Metric');

// @desc    Get future metrics (Smart City & Trends)
// @route   GET /api/future/metrics
exports.getMetrics = async (req, res) => {
    try {
        const metrics = await Metric.find();
        res.status(200).json({ success: true, data: metrics });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// @desc    Save a future prediction
// @route   POST /api/future/predict
exports.savePrediction = async (req, res) => {
    try {
        const prediction = await Prediction.create(req.body);
        res.status(201).json({ success: true, data: prediction });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get recent predictions (for visual social proof)
// @route   GET /api/future/predictions
exports.getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find().sort('-createdAt').limit(10);
        res.status(200).json({ success: true, data: predictions });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
