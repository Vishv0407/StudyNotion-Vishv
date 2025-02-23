const express = require('express');
const router = express.Router();

const {login, signUp, sendOtp, changePassword } = require('../controllers/Auth');
const {resetPasswordToken, resetPassword, resetComplete, resetCompleteUserData} = require('../controllers/ResetPassword');

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOtp);
router.post("/changepassword", changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
router.post("/reset-complete/userData", resetCompleteUserData);

module.exports = router;