const HeritageSite = require('../models/HeritageSite');
const Metric = require('../models/Metric');
const Log = require('../models/Log');
const Prediction = require('../models/Prediction');

// @desc    Get all heritage sites
// @route   GET /api/v1/heritage/sites
// @access  Public
exports.getSites = async (req, res, next) => {
    try {
        const sites = await HeritageSite.find();
        res.status(200).json({ success: true, count: sites.length, data: sites });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Get all metrics
// @route   GET /api/v1/heritage/metrics
// @access  Public
exports.getMetrics = async (req, res, next) => {
    try {
        const metrics = await Metric.find();
        res.status(200).json({ success: true, count: metrics.length, data: metrics });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Get all logs
// @route   GET /api/v1/heritage/logs
// @access  Public
exports.getLogs = async (req, res, next) => {
    try {
        const logs = await Log.find().sort('-createdAt').limit(20);
        res.status(200).json({ success: true, count: logs.length, data: logs });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

// @desc    Get prediction for a specific site
// @route   GET /api/v1/heritage/sites/:id/predict
// @access  Public
exports.getSitePrediction = async (req, res, next) => {
    try {
        const site = await HeritageSite.findById(req.params.id);
        if (!site) return res.status(404).json({ success: false, error: 'Site not found' });

        // Simple linear regression simulation based on last 2 points
        const history = site.historicalData.sort((a, b) => a.year - b.year);
        const p1 = history[history.length - 2];
        const p2 = history[history.length - 1];

        const slope = (p2.integrity - p1.integrity) / (p2.year - p1.year);

        const projection = [];
        for (let year = 2025; year <= 2050; year += 5) {
            const projectedIntegrity = Math.max(0, p2.integrity + slope * (year - p2.year));
            projection.push({ year, integrity: Math.round(projectedIntegrity) });
        }

        res.status(200).json({
            success: true,
            data: {
                siteId: site._id,
                siteName: site.name,
                historicalTrend: history,
                futureProjection: projection,
                riskFactors: site.riskFactors
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Save a prediction
// @route   POST /api/v1/heritage/predictions
// @access  Public
exports.savePrediction = async (req, res, next) => {
    try {
        const prediction = await Prediction.create(req.body);
        res.status(201).json({ success: true, data: prediction });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get all saved predictions
// @route   GET /api/v1/heritage/predictions
// @access  Public
exports.getSavedPredictions = async (req, res, next) => {
    try {
        const predictions = await Prediction.find().sort('-savedAt');
        res.status(200).json({ success: true, count: predictions.length, data: predictions });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
