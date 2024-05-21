const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorHandler = require("../utils/errorHandler");

// Middleware to authenticate user by checking JWT token in authorization header
const isAuthenticatedUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];  
    }

    if (!token) {
        return next(new ErrorHandler("Not authorized to access this resource", 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Not authorized, token failed", 401));
    }
};

module.exports = isAuthenticatedUser;
