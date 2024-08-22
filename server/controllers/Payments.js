const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
// const {CourseEnrollmentEmail} = require('../mail-templates/courseEnrollmentEmail');
const mongoose = require('mongoose');

// capture the payment order and initiate razorpay

exports.capturePayments = async(req,res) => {
    const courseId = req.body;
    const userId = req.user.id;

    if(!courseId){
        return res.json({
            success: false,
            message: "please provide valid courseId"
        });
    }

    let course;

    try{
        course = await Course.findById(courseId);
        if(!course){
            return res.json({
                success: false,
                message: "Course not found"
            })
        }

        // check that is user already enrolled in course or not

        // convert string into object id
        const uid = new mongoose.Types.ObjectId(userId);

        if(course.studentEnrolled.includes(uid)){
            return res.json({
                success: false,
                message: "You already enrolled in this course"
            });
        }
    }
    catch(error){
        console.log("error in capturePayment");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }

    // order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{
            courseId: courseId,
            userId
        }
    }

    try{
        // initiate the payment using razorpay

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        })
    }
    catch(error){
        console.log("error in initiate the payment");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
};

// verify signature of Razorpay and server

exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            // course na studentenrolled list ma student ne add
            const enrolledStudent = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push:{studentEnrolled: userId}},
                {new:true},
            )

            if(!enrolledStudent){
                return res.status(400).json({
                    success: false,
                    message: "Course not found"
                })
            }

            console.log(enrolledStudent);

            // student na course list ma course ne add
            const studentData = User.findOneAndUpdate(
                                                {_id: userId},
                                                {$push:{courses: courseId}},
                                                {new:true},
            )

            console.log(studentData);

            // send the mail for confirmation
            const emailResponse = mailSender(
                studentData.email, 
                "Course Enrolled Successfully", 
                "Thank you for enrolling with me :)"
            )

            return res.status(200).json({
                success: true,
                message: "Signature verified and course added"
            });



        }
        catch(error){
            console.log("error in verifySignature in payment controller");
            console.error(error);
            return res.status(500).json({
                success:false,
                message: error.message,
            })
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Signature not matched"
        })
    }
};