// backend/routes/schemesRoutes.js
const express = require('express');
const router = express.Router();
const schemesController = require('../controllers/schemesController');

// Define API endpoints for the homepage sections
router.get('/all', schemesController.getAllSchemes);
router.get('/popular', schemesController.getPopularSchemes);
router.get('/farmers', schemesController.getFarmerSchemes);
router.get('/entrepreneurs', schemesController.getEntrepreneurSchemes);
router.get('/search', schemesController.searchSchemes);
router.get('/:id', schemesController.getSchemeById);
module.exports = router;