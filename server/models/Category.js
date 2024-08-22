const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
        trim: true,
    },
    categoryDescription:{
        type: String,
    },
    courses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    ]
})

module.exports = mongoose.model("Category", categorySchema);