const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// resetPasswordToken
exports.resetPasswordToken = async(req, res) => {
    try{
        // get email from req body
        const email = req.body.email;

        // find user
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found, please create account"
            });
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by this token and reset password expiry time
        const updateDetails = await User.findOneAndUpdate(
                                        {email: email}, 
                                        {
                                            token: token,
                                            resetPasswordExpires: Date.now() + 2*24*60*60*1000,
                                            // 5 mins     
                                        },
                                        {new: true});

        // create url
        const url = `http://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset Link", `Your link: ${url}`);

        res.status(200).json({
            success: true,
            message: "Reset Email sent successfully",
        });
    }
    catch(error){
        console.log("error in resetPasswordToken controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Error in resetPasswordToken controller",
        })
    }
}

// resetPassword - update DB

exports.resetPassword = async (req, res) => {
    try {
        // Fetch data from req body
        const { token, password, confirmPassword } = req.body;

        // Check if all fields are filled
        if (!token || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are not filled",
            });
        }

        // Check if new password and confirm password match
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Find user by token
        const userDetails = await User.findOne({ token: token });

        // Check if user exists
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "Reset Password Token is invalid",
            });
        }

        // Check if the token has expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Reset Password Token has expired",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );

        const email = userDetails.email;
        const firstName = userDetails.firstName;

        await mailSender(email, "Password changed Successfully", 
            `Dear ${firstName},
            
            Your StudyNotion account password has been changed successfully!!`
        );

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });

    } catch (error) {
        console.error("Error in resetPassword controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in resetPassword controller",
        });
    }
};

exports.resetCompleteUserData = async(req, res) => {
    try{
        const {token} = req.body;
        
        const user = await User.findOne({token:token});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Reset complete user data fetch successfully",
            data: user
        });
    }
    catch{
        console.error("Error in resetCompleteUserData controller", error);
        return res.status(500).json({
            success: false,
            message: "Error in resetCompleteUserData controller",
        });

    }
}