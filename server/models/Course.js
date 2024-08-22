const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required: true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required: true,
        trim:true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }   
    ],
    ratingAndReviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],
    price:{
        type: Number,
    },
    thumbnail:{
        type:String,
    },
    category:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }
    ],
    tags:{
        type: [String],
    },
    studentEnrolled:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    instructions:{
        type: [String],
    },
    ststus:{
        type: String,
        enum: ["Draft", "Published"],
        default: 'Draft' // Default status is set to "Draft"
    }

});

module.exports = mongoose.model("Course", courseSchema);