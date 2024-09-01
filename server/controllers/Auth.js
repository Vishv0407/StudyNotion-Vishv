const User = require("../models/User");
const Profile  = require("../models/Profile")
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
require('dotenv').config();

exports.sendOtp = async(req, res) => {

    try{
        // fetch email from req body
        const {email} = req.body;

        // if user exist them return
        const checkUserExist = await User.findOne({email: email});
        if(checkUserExist){
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        } 

        // generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        // check unique otp or not
        let result = await Otp.findOne({otpValue: otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await Otp.findOne({otpValue: otp});
        }

        const otpPayload = {email, otpValue: otp};

        // create an entry in DB
        const otpBody = await Otp.create(otpPayload);
        console.log(otpBody);

        // send success response
        res.status(200).json({
            success: true,
            message:"otp sent successfully",
            otp
        })
    }
    catch(error){
        console.log("error in sendOtp controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
    

}

// signUp

exports.signUp = async(req, res) => {
    try{
        // data fetch from req body
        const {firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp} = req.body;

        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are not filled",
            })
        }

        // match password and confirm password
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password is not matched",
            })
        }

        // user already exist or not
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({
                success: false,
                message: "User already exist, Please Log In",
            })
        }

        // find most recent otp
        const responseOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log(responseOtp); 

        // validate otp
        // check here for .otp down
        if(responseOtp.length == 0){
            // otp not found
            return res.status(400).json({
                success: false,
                message: "OTP found with 0 length",
            })
        }
        else if(otp !== responseOtp[0].otpValue){
            return res.status(400).json({
                success: false,
                message: "OTP not matched",
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // entry create in db

        const profileData = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails: profileData._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // res 200
        res.status(200).json({
            success: true,
            message:"User Signed in successfully",
            user
        })
    }
    catch(error){
        console.log("error in signUp controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "User not registered, please try again.",
        })
    }
}

// login

exports.login = async(req, res) => {
    try{
        // fetch data from req body
        const {email, password, accountType} = req.body;

        // validate data
        if(!email || !password || !accountType){
            return res.status(403).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        // get data from db
        // check user exist or not

        const user = await User.findOne({email}).populate("additionalDetails").exec();

        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found, please create account then try to login",
            });
        }

        if(accountType !== user.accountType){
            return res.status(403).json({
                success: false,
                message: "Wrong role selected",
            })
        }

        if(await bcrypt.compare(password, user.password)){
            
            // create token and cookie
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET
            //     , {
            //     expiresIn: "2h"
            // }
        );

            user.token = token;
            user.password = undefined;

            console.log(token)
            console.log(payload)
            console.log(user)

            const options = {
                // 3 days in microsecond
                Expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged In successfully",
                user
            });
        }
        else{
            return res.status(400).json({
                success: false,
                message:"Password not matched",
            });
        }

    }
    catch(error){
        console.log("error in login controller");
        console.error(error);

        return res.status(500).json({
            success:false,
            message: "error in login controller",
        })
    }
}

// chnagePassword

// you can use auth middleware to authenticate user, then no need to pass email
exports.changePassword = async(req, res) => {
    try{
        // fetch data from req body
        const {email, oldPassword, newPassword, confirmPassword } = req.body;

        if(!email || !oldPassword || !newPassword || !confirmPassword ){
            res.status(403).json({
                success: false,
                message:"All fields are not filled",
            });
        }

        if(newPassword !== confirmPassword){
            res.status(400).json({
                success: false,
                message:"new password and confirm password not matched",
            });
        }

        // get user from db
        const user = await User.findOne({email});

        // compare old password with entered password
        // update database with new password
        if( await bcrypt.compare(oldPassword, user.password)){
            const newHashedPassword = bcrypt.hash(newPassword, 10);
            
            await User.findOneAndUpdate({ email: email }, {  password: newHashedPassword }, {new: true});
            
            res.status(200).json({
                success: true,
                message: "Password changed successfully"
            });
        }
    }
    catch(error){
        console.log("error in changePassword controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Error in changePassword controller",
        })
    }
}


