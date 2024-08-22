const express = require('express');
const router = express.Router();

const { createRating, getAverageRating, getAllRating } = require('../controllers/RatingAndReview')
const { createCategory, showAllCategories, CategoryPageDetails } = require('../controllers/Categories')
const { createCourse, showAllCourses, getCourseDetails} = require('../controllers/Course')
const { createSection, updateSection, deleteSection} = require('../controllers/Section')
const { createSubsection, updateSubSection, deleteSubSection } = require('../controllers/SubSection')

const {auth, isAdmin, isInstructor, isStudent} = require('../middlewares/Auth');

// routes

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", CategoryPageDetails);

router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/createSubsection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

module.exports = router;
