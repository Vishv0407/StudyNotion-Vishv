
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async(req,res) => {
    try{
        // fetch
        const {name, description} = req.body;

        // validate data
        if(!name || !description){
            res.status(403).json({
                success: false,
                message:"All fields are not filled",
            })
        }

        // entry in db
        const category = await Category.create({
            categoryName: name,
            categoryDescription: description,
        });
        console.log(category);

        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });
    }
    catch(error){
        console.log("error in createCategory controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.showAllCategories = async(req, res) => {
    try{
        const allCategories = await Category.find({}, {categoryName: true, categoryDescription: true});
        console.log(allCategories);
        return res.status(200).json({
            success: true,
            message: "All categories fetched successfully",
            data: allCategories,
        });
    } 
    catch(error){
        console.log("error in showAllCategories controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

exports.CategoryPageDetails = async(req, res) => {
    try{
        // get category id
        const {categoryId} = req.body;

        // get course with that id
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        if(selectedCategory.courses.length === 0){
            console.log("No Courses found for selected category");
            return res.status(404).json({
                success: false,
                message: "No Courses found for selected category",
            });
        }

        // get course for different id
        const differentCategories = await Category.find({
            _id: {$ne: categoryId} // ne = not equal    
        })
        .populate("courses").exec();

        if(!differentCategories){
            return res.status(404).json({
                success: false,
                message: "different categories not found",
            });
        }

        // top selling course
        const topSellingCourses = await Course.aggregate([
            {
              $sort: { studentEnrolled: -1 }
            },
            {
              $limit: 10
            }
        ]);

        if(!topSellingCourses){
            return res.status(404).json({
                success: false,
                message: "top selling courses not found",
            });
        }

          
        console.log(topSellingCourses);

        return res.status(200).json({
            success: true,
            message: "Category details fetched successfully",
            selectedCategory: selectedCategory,
            differentCategories: differentCategories,
            topSellingCourses: topSellingCourses
        });
        
    }
    catch(error){
        console.log("error in showAllCategories controller");
        console.error(error);
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}