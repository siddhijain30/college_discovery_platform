const express = require('express');
const router = express.Router();
const predictorController = require('../controllers/predictorController');

router.post('/', predictorController.predictColleges);

module.exports = router;
