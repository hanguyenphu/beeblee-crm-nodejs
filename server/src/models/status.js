const mongoose = require("mongoose");


const statusSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        color: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,

    }
);

statusSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'status'
})


const Status = mongoose.model("Status", statusSchema);
module.exports = Status;