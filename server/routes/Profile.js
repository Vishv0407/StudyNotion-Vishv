const express = require('express');
const router = express.Router();

const {updateProfile, deleteAccount, getUserAllDetails, getEnrolledCourses, updateDisplayPicture} = require('../controllers/Profile');
const {auth} = require('../middlewares/Auth');

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getUserDetails", auth, getUserAllDetails);

// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;
