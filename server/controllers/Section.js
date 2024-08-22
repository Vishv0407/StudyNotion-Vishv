const Section = require('../models/Section');
const Course = require('../models/Course');
require('dotenv').config();

exports.createSection = async(req,res) => {
    try{
        // fetch
        const {sectionName, courseId} = req.body;

        // validate
        if(!sectionName || !courseId){
            res.status(403).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        // create section
        const newSection = await Section.create({sectionName});

        // update Course with section's objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent: newSection._id,
                                                }
                                            },
                                            {new:true}
        ).populate("courseContent")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourseDetails,
        });  
    }
    catch(error){
        console.log("error in createSection controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}    

exports.updateSection = async(req, res) => {
    try{
        const {sectionName, sectionId} = req.body;

        // validate
        if(!sectionName || !sectionId){
            res.status(403).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        // update db
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName: sectionName},
            {new:true},
        );

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        });



    }
    catch(error){
        console.log("error in updateSection controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// delete
exports.deleteSection = async(req, res) => {
    try{
        const {sectionId} = req.body;

        const updateSection = await Section.findByIdAndDelete(sectionId);

        if(!updateSection){
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        // todo: do we need to delete the entry from the course schema ??
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    }
    catch(error){
        console.log("error in deleteSection controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
