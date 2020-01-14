const mongoose = require("mongoose");

const SchemaType = mongoose.Schema.Types;

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: SchemaType.Decimal128,
            required: true,
            trim: true
        },
        startDate: {
            type: Date
        },
        completedDate: {
            type: Date
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    },
    {
        timestamps: true
    }
);
const Project = mongoose.model("Business", projectSchema);
module.exports = Project;