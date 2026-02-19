const HeritageSite = require('../models/HeritageSite');
const Metric = require('../models/Metric');
const Log = require('../models/Log');

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
