const mailSender = require('../utils/mailSender');

exports.contactUsform = async(req,res) => {
    try{
        // get data
        const {firstName, lastName, email, contactNumber, message} = req.body;

        // validate
        if(!firstName || !lastName || !email || !contactNumber || !message){
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields.'
            });
        }

        mailSender(
            process.env.EMAIL_USER, 
            "Contact us form submission", 
            `Hello Developer, your website got an submision in contact us form.
            from: ${firstName} ${lastName},
            contact Number: ${contactNumber},
            message: ${message}`
        )

        mailSender(
            email,
            "Thank you for contacting us",
            `Hello ${firstName} ${lastName}, your message has been sent successfully. We will get back
            to you soon.`
        )

        return res.status(200).json({
            success: true,
            message: "New contact us submission and both email sent successfully"
        })
    }
    catch(error){
        console.log("error in contactUsForm controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}