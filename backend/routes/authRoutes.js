// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', authController.signup);
// @route   POST /api/auth/login
// @desc    Authenticate a user & get token
router.post('/login', authController.login);


module.exports = router;