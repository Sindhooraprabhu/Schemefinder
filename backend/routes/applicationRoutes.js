const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth'); // Import the auth middleware
const applicationController = require('../controllers/applicationController');

// @route   POST /api/application/submit
// @desc    Submit an application
// @access  Private
router.post('/submit', auth, applicationController.submitApplication);

module.exports = router;