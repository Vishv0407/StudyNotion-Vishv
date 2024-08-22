// const subSection = require('../models/SubSection');
const Section = require('../models/Section');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const SubSection = require('../models/SubSection');
require('dotenv').config();

// create

exports.createSubsection = async (req, res) => {
    try {
        // Fetch data from request body and files
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files?.videoFile; // Safeguard file access

        // Validate required fields
        if (!sectionId || !title || !description || !timeDuration || !video) {
            return res.status(400).json({ // Ensure single response
                success: false,
                message: "All fields are required",
            });
        }

        // Upload video to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // Create new subsection
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        });

        // Update the section with the new subsection ID
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: subSectionDetails._id,
                },
            },
            { new: true }
        )
        .populate("subSection")
        .exec();

        // Return successful response with updated data
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            data: updatedSection, // Include updated section data
        });
    } catch (error) {
        console.log("Error in createSubsection controller"); // Proper error logging
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// update

exports.updateSubSection = async(req, res) => {
    try{
        const {title, timeDuration, description, subSectionId} = req.body;
        const video = req.files?.videoFile;

        if( !subSectionId || !title || !description || !timeDuration ){
            res.status(400).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        let videoUrl;
        let updatedSubSection;

        if(video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            videoUrl = uploadDetails.secure_url;

             // update db
            updatedSubSection = await SubSection.findByIdAndUpdate(
                subSectionId,
                {title: title, timeDuration: timeDuration, description: description, videoUrl: videoUrl },
                {new:true},
            );
        }
        else{
            updatedSubSection = await SubSection.findByIdAndUpdate(
                subSectionId,
                {title: title, timeDuration: timeDuration, description: description},
                {new:true},
            );
        }

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            data: updatedSubSection,
        });
    }
    catch(error){
        console.log("error in updateSubSection controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// delete
exports.deleteSubSection = async(req, res) => {
    try{
        const {subSectionId} = req.body;

        const subSectionDetails = await SubSection.findByIdAndDelete(subSectionId);

        if(!subSectionDetails){
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // todo: do we need to delete the entry from the section schema ??
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
        });
    }
    catch(error){
        console.log("error in deleteSubSection controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}
