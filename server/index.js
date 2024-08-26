const express = require('express');
const app = express();

const PaymentRoutes = require('./routes/Payments');
const UserRoutes = require('./routes/User');
const ProfileRoutes = require('./routes/Profile');
const CourseRoutes = require('./routes/Course');
const ContactUsRoutes = require('./routes/ContactUs');

const database = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
        origin: "*",
        credentials: true,
    })
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

database.dbConnect();
cloudinaryConnect();

app.use("/api/v1/auth", UserRoutes);
app.use("/api/v1/profile", ProfileRoutes);
app.use("/api/v1/course", CourseRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1", ContactUsRoutes);

app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "Boooooooooom, your server is started"
    })
})

app.listen(port , () => {
    console.log(`App is running at ${port}`);
})