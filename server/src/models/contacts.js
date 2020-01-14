const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

contactSchema.virtual("businesses", {
    ref: "Business",
    localField: "_id",
    foreignField: "contacts"
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
