const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

exports.createRating = async(req, res) => {
    try {
        // get user id
        // get data from body
        // check user is enrolled or not
        // check already reviewed or not
        // create entry
        // update course model
        // retuen response 

        const userId = req.user.id;

        const {rating, review, courseId} = req.body();

        // user enrolled or not
        const courseDetails = await Course.findOne(
            {_id: courseId,
            studentEnrolled: {$elemMatch: {$eq: userId}},
        });

        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'Student not enrolled with this course'
            })
        }

        // if user reviewed or not
        const alreadyReviewed = await RatingAndReview.findOne(
            {user: userId, course: courseId}
        )

        if(alreadyReviewed){
            return res.status(400).json({
                success: false,
                message: 'User already reviewed this course'
            })
        }

        const ratingReview = await RatingAndReview.create(
            {
                rating, review,
                user: userId, course: courseId
            })

        const updatedCourse = await Course.findByIdAndUpdate(
            {courseId},
            {
                $push: {ratingAndReview: ratingReview._id}
            },
            {new:true}
        )
        console.log(updatedCourse);

        return res.status(200).json({
            success: true,
            message: 'Rating & Review added successfully',
            ratingReview
        });
    }
    catch(error){
        console.log("error in createRating controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.getAverageRating = async(req, res) => {
    try {
        // get course id
        const courseId = req.body.courseId;

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {course: new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: '$rating'}
                }
            }
        ])

        // return rating
        // result will return an array

        if(result.lenght > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
                message: 'Average rating calculated successfully',
            })
        }

        // if there is not rating yet
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: 'Average rating is 0 because no one rated till now',
        })
    }
    catch(error){
        console.log("error in getAverageRating controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.getAllRating = async(req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"})
                                .populate({
                                    path: "user",
                                    select: "firstName lastName email image",
                                })
                                .populate({
                                    path: "course",
                                    select: "courseName"
                                })
                                .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })
    }
    catch(error){
        console.log("error in getAllRating controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}