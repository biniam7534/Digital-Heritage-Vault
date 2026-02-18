const express = require('express');
const {
    getArtifacts,
    getArtifact,
    createArtifact,
    updateArtifact,
    deleteArtifact,
    getStats
} = require('../controllers/artifactController');

const router = express.Router();

router.route('/')
    .get(getArtifacts)
    .post(createArtifact);

router.get('/stats', getStats);

router.route('/:id')
    .get(getArtifact)
    .put(updateArtifact)
    .delete(deleteArtifact);

module.exports = router;
