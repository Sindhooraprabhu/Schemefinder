// backend/routes/downloadRoutes.js

const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const auth = require('../middelware/auth');

// @route   GET /api/download/:filename
// @desc    Download a file from the server
// @access  Private
router.get('/:filename', auth, downloadController.downloadFile);

module.exports = router;