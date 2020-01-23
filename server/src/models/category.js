const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true,

    }
);

categorySchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;