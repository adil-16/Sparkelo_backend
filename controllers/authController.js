const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const catchAsncError= require ("../middleware/catchAsncError");

exports.loginUser = catchAsncError(async (req, res, next) => {
    let { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter email and password",
            });
            
            
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email and Password",
            });
            
            
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
            

    
    }
    
    sendToken(user, 200, res); 
       
});