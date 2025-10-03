// // backend/routes/dashboardRoutes.js
// const express = require('express');
// const router = express.Router();
// const auth = require('../middelware/auth'); // Check spelling: 'middelware' -> 'middleware'

// const upload = require('../config/multerConfig'); // This imports the whole module.exports object
// const { 
//     getDashboardData, 
//     upsertDashboardData,
//     deleteDashboardData
// } = require('../controllers/dashboardController');

// // Ensure your main server file uses this under the '/api/dashboard' path:
// // app.use('/api/dashboard', require('./routes/dashboardRoutes'));


// // @route   GET /api/dashboard
// // @desc    Get user-specific dashboard data
// // @access  Private
// router.get("/", auth, getDashboardData);

// // @route   POST /api/dashboard
// // @desc    Create or update user-specific dashboard data (with files)
// // @access  Private
// router.post(
//     "/", 
//     auth, // 1. Authentication Check
//     upload.fields([ // 2. Multer Middleware for File Handling (Crucial Fix)
//         { name: 'landImage', maxCount: 1 },
//         { name: 'idDocuments', maxCount: 5 },
//         { name: 'homePhotos', maxCount: 3 }
//     ]),
//     upsertDashboardData // 3. Controller
// );

// // @route   DELETE /api/dashboard
// // @desc    Delete user-specific dashboard data
// // @access  Private
// router.delete("/", auth, deleteDashboardData);

// module.exports = router;











const express = require('express');
const router = express.Router();
const auth = require('../middelware/auth'); // fixed spelling

const upload = require('../config/multerConfig'); // Multer setup
const { 
    getDashboardData, 
    upsertDashboardData,
    deleteDashboardData
} = require('../controllers/dashboardController');

// Ensure your main server file uses this under the '/api/dashboard' path:
// app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// @route   GET /api/dashboard
// @desc    Get user-specific dashboard data
// @access  Private
router.get("/", auth, getDashboardData);

// @route   POST /api/dashboard
// @desc    Create or update user-specific dashboard data (with files)
// @access  Private
router.post(
    "/", 
    auth,
    upload.fields([
        { name: 'landImage', maxCount: 1 },
        { name: 'idDocuments', maxCount: 5 },
        { name: 'homePhotos', maxCount: 3 },
        { name: 'businessDocuments', maxCount: 5 },
        { name: 'businessPhotos', maxCount: 3 }
    ]),
    upsertDashboardData
);

// @route   DELETE /api/dashboard
// @desc    Delete user-specific dashboard data
// @access  Private
router.delete("/", auth, deleteDashboardData);

module.exports = router;
