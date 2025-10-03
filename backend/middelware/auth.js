const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // 1. Get the token from the project's standard header
    const token = req.header("x-auth-token"); 
    
    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    // Check if secret key is configured
    if (!secretKey) {
        console.error("JWT_SECRET is not configured.");
        return res.status(500).json({ message: "Server configuration error." });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, secretKey); 
        // Ensure decoded.user exists and has id
        if (!decoded.user || !decoded.user.id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("JWT verification error:", err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};
