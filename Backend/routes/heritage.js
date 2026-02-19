const express = require('express');
const { getSites, getMetrics, getLogs } = require('../controllers/heritageController');

const router = express.Router();

router.get('/sites', getSites);
router.get('/metrics', getMetrics);
router.get('/logs', getLogs);

module.exports = router;
