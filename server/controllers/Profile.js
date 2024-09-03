const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const Course = require('../models/Course');
require('dotenv').config();

// we created profile in user creation with null values

exports.updateProfile = async(req,res) => {
    try{
        // fetch, userId also
        // validate
        // find 
        // update
        // return response

        const {firstName, lastName, contactNumber, dateOfBirth, about, gender} = req.body;
        const userId = req.user.id;

        if(!userId || !gender){
            res.status(400).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        // if(!dateOfBirth) dateOfBirth="";
        // if(!about) about="";



        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        userDetails.firstName = firstName;
        userDetails.lastName = lastName;
        userDetails.contactNumber = contactNumber;

        if (userDetails.additionalDetails) {
            userDetails.additionalDetails.about = about;
            userDetails.additionalDetails.dateOfBirth = dateOfBirth;
            userDetails.additionalDetails.gender = gender;
            await userDetails.additionalDetails.save(); // Save the additional details
        }

        // we created obj then save in db
        await userDetails.save(); // Save the user


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userDetails
        })


    }
    catch(error){
        console.log("error in updateProfile controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })

    }
}

// delete account

exports.deleteAccount = async(req,res) => {
    try{
        // get id
        // valid from db
        // go and delete profile
        // delete user
        // return response

        const userId = req.user.id;

        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User ID not provided",
            });
        }

        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // additional Profile details - delete
        // unenroll from enrolled course
        // user - delete
        
        await Profile.findByIdAndDelete({_id: userDetails.additionalDetails});

        const enrolledCourse = userDetails.courses;
        for (let i = 0; i < enrolledCourse.length; i++) {
            const courseId = enrolledCourse[i];
            const courseDetails = await Course.findByIdAndUpdate(
                courseId,
                {
                    $pull:{
                        studentEnrolled: userId
                    }
                },
                {new:true}
            );
        }
  
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })


    }
    catch(error){
        console.log("error in deleteAccount controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.getUserAllDetails = async(req,res) => {
    try{
        // get user id
        // get user details from db
        // return response
        const userId = req.user.id;
        
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        if(!userId){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Account details fetched successfully",
            userDetails
        })

    }
    catch(error){
        console.log("error in getUserAllDetails controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// getEnrolledCourses

// updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const image = req.files.displayPicture;
        
        // Debugging logs
        // console.log('User ID:', userId);
        // console.log('Received image:', image);
        
        if (!image) {
            return res.status(400).json({
                success: false,
                message: "No image provided",
            });
        }

        const imageLink = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: imageLink.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.log("Error in updateDisplayPicture controller");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
