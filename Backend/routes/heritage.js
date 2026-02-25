const express = require('express');
const {
    getSites,
    getSite,
    getMetrics,
    getLogs,
    getSitePrediction,
    savePrediction,
    getSavedPredictions,
    createSite,
    updateSite,
    deleteSite
} = require('../controllers/heritageController');

const router = express.Router();

router.get('/sites', getSites);
router.post('/sites', createSite);
router.get('/sites/:id', getSite);
router.put('/sites/:id', updateSite);
router.delete('/sites/:id', deleteSite);
router.get('/sites/:id/predict', getSitePrediction);
router.get('/metrics', getMetrics);
router.get('/logs', getLogs);
router.route('/predictions')
    .get(getSavedPredictions)
    .post(savePrediction);

module.exports = router;
