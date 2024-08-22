const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create course
exports.createCourse = async (req, res) => {
    try {
        // Fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, category, tags, instructions } = req.body;
        const thumbnailImage = req.files ? req.files.thumbnailImage : null;

        // Validate required fields
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tags || !instructions || !thumbnailImage) {
            return res.status(403).json({
                success: false,
                message: "All fields are not filled",
            });
        }

        if (price < 0) {
            return res.status(403).json({
                success: false,
                message: "Price is not valid",
            });
        }

        // Check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        // Check if the category is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Image upload to Cloudinary
        const thumbnail = await uploadImageToCloudinary(thumbnailImage, process.env.IMG_FOLDER_NAME);

        // Create new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            tags,
            instructions,
            status: "Draft",
            thumbnail: thumbnail.secure_url,
        });

        // Update user's course list
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        // Update category's course list
        await Category.findByIdAndUpdate(
            { _id: categoryDetails._id },
            { $push: { courses: newCourse._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        console.log("Error in createCourse controller");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// fetch courses
exports.showAllCourses = async(req, res) => {
    try{
        // const allCourses = await Course.find({}, {courseName: true, 
        //                                         courseDescription: true, 
        //                                         price: true, 
        //                                         thumbnail: true, 
        //                                         instructor: true, 
        //                                         ratingAndReviews: true, 
        //                                         studentEnrolled: true,})
        //                                         .populate("instructor")
        //                                         .exec();

        const allCourses = await Course.find({});
        
        return res.status(200).json({
            success: true,
            message: "All courses fetched successfully",
            data: allCourses,
        });                                       
        
    }
    catch(error){
        console.log("error in showAllCourses controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.getCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.findById(
            courseId )
            .populate(
                {
                    path: "instructor",
                    populate:{
                        path: "additionalDetails",
                    },
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path:"courseContent",
                populate: {
                    path: "subSection"    
                },
            })
            .exec();

            console.log(courseDetails)
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Course not found with id: ${courseId}`,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course details fetched successfully",
            data: courseDetails
        })
        
    }
    catch(error){
        console.log("error in getCourseDetails controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}