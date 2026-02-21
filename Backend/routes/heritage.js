const express = require('express');
const {
    getSites,
    getMetrics,
    getLogs,
    getSitePrediction,
    savePrediction,
    getSavedPredictions
} = require('../controllers/heritageController');

const router = express.Router();

router.get('/sites', getSites);
router.get('/sites/:id/predict', getSitePrediction);
router.get('/metrics', getMetrics);
router.get('/logs', getLogs);
router.route('/predictions')
    .get(getSavedPredictions)
    .post(savePrediction);

module.exports = router;
