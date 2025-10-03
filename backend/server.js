// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');
// const cron = require('node-cron'); // Ensure this is installed if used

// // Import Route Files
// const authRoutes = require('./routes/authRoutes'); 
// const schemesRoutes = require('./routes/schemesRoutes');
// const downloadRoutes = require('./routes/downloadRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const applicationRoutes = require('./routes/applicationRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ------------------------------------------------------------
// // 🛑 CRITICAL FIX: CORS CONFIGURATION (MUST BE NEAR THE TOP)
// // ------------------------------------------------------------
// app.use(cors({
//     // 5173 is the common port for Vite React development server
//     origin: 'http://localhost:5173', 
    
//     // Allow the specific headers required for authentication
//     allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], 
    
//     // Allow all standard methods
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// }));

// // ------------------------------------------------------------
// // Core Middleware
// // ------------------------------------------------------------

// // Middleware to parse JSON bodies (replaces body-parser.json())
// app.use(express.json());

// // Middleware to serve uploaded files statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ------------------------------------------------------------
// // Database Connection & Server Start
// // ------------------------------------------------------------

// const db = process.env.DB_URI; 

// // CRITICAL FIX: The variable is 'db'
// mongoose.connect(db)
//     .then(() => {
//         console.log('MongoDB connected successfully');

//         // --- Routes ---
//         app.use('/api/auth', authRoutes);
//         app.use('/api/schemes', schemesRoutes);
//         app.use('/api/download', downloadRoutes);
//         app.use('/api/dashboard', dashboardRoutes); 
//         app.use('/api/application', applicationRoutes);
        

        
//         // --- Start server only after DB connection ---
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });

//         // --- Optional: Cron job ---
//         // cron.schedule(...)
//     })
//     .catch(err => console.error('MongoDB connection error:', err));

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cron = require('node-cron');

// Import Route Files
const authRoutes = require('./routes/authRoutes'); 
const schemesRoutes = require('./routes/schemesRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------
// ✅ CORS CONFIGURATION (MUST BE BEFORE ROUTES)
// ------------------------------------------------------------
app.use(cors({
    origin: 'http://localhost:5173', // React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], // include your auth token
    credentials: true, // allows cookies/auth headers
}));

// ------------------------------------------------------------
// Core Middleware
// ------------------------------------------------------------
app.use(express.json()); // parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ------------------------------------------------------------
// Database Connection & Server Start
// ------------------------------------------------------------
const db = process.env.DB_URI;

mongoose.connect(db)
    .then(() => {
        console.log('MongoDB connected successfully');

        // --- Routes ---
        app.use('/api/auth', authRoutes);
        app.use('/api/schemes', schemesRoutes);
        app.use('/api/download', downloadRoutes);
        app.use('/api/dashboard', dashboardRoutes); 
        app.use('/api/application', applicationRoutes);

        // --- Start server ---
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Optional: Cron job
        // cron.schedule(...)

    })
    .catch(err => console.error('MongoDB connection error:', err));
