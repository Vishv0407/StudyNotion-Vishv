const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otpValue:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60,
    },
})

// function to send mail
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from Techband", otp);
        console.log("email sent successfully", mailResponse);
    }
    catch(error){
        console.log("error in sendVerificationEmail function", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otpValue);
    next();
})
module.exports = mongoose.model("Otp", otpSchema);