const express = require('express');
const { getMetrics, savePrediction, getPredictions } = require('../controllers/futureController');

const router = express.Router();

router.get('/metrics', getMetrics);
router.post('/predict', savePrediction);
router.get('/predictions', getPredictions);

module.exports = router;
