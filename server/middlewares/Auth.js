const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// auth
exports.auth = async(req, res, next) => {
    try{
        // console.log(req);
        // extract the token
        // const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");
        // const token = localStorage.getItem("token");
        const token = req.body.token;

        const cleanedToken = token.replace(/"/g, '').trim();
        
        console.log(cleanedToken); // Should be "dsaa" without quotes

        console.log("auth sudhi pochi gyu");

        if(!token){
            res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        // verify the token
        try{
            const decode = jwt.verify(cleanedToken, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
            next();
        }
        catch(error){
            res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
    }
    catch(error){
        console.log("Error in auth middleware");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "message something went wrong in auth middleware",
        })
    }
}

// isStudent

exports.isStudent = async(req, res, next) => {
    try{    
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success: false,
                message: "This route is only for Students" 
            })
        }
        else{
            // return res.status(200).json({
            //     success: true,
            //     message: "Welcome to protected route for Students",
            // })

            return next();
        }
    }
    catch(error){
        console.log("Error in isStudent middleware");
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in isStudent middleware",
        })
    }
}


// isInstructor

exports.isInstructor = async(req, res, next) => {
    try{    
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success: false,
                message: "This route is only for Instructors" 
            })
        }
        else{
            // return res.status(200).json({
            //     success: true,
            //     message: "Welcome to protected route for Instructors",
            // })
            return next();
        }
    }
    catch(error){
        console.log("Error in isInstructor middleware");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in isInstructor middleware",
        })
    }
}

// isAdmin

exports.isAdmin = async(req, res, next) => {
    try{    
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success: false,
                message: "This route is only for Admins" 
            })
            
        }
        else{
            // res.status(200).json({
                // success: true,
                // message: "Welcome to protected route for Admins",
                // })
            return next();
        }
    }
    catch(error){
        console.log("Error in isAdmin middleware");
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in isAdmin middleware",
        })
    }
}
