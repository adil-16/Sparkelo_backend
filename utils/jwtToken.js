const jwt = require('jsonwebtoken');

// Function to send token in HTTP-only cookie and as a JSON response
const sendToken = (user, statusCode, res) => {
    // Create a token with user id and email, expires in 1 hour
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRETKEY, {
        expiresIn: '1h'
    });

    // Options for cookie
    const options = {
        expires: new Date(Date.now() + 30 * 24 * 3600000), // 30 days expiration
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    // Set the "token" cookie and send response
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        message: "Logged in successfully!"
    });
};

module.exports = sendToken;
