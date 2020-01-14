const mongoose = require("mongoose");


const SchemaType = mongoose.Schema.Types
const provinceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gst: {
        type: SchemaType.Decimal128,
        required: true,
        trim: true
    },
    pst: {
        type: SchemaType.Decimal128,
        required: true,
        trim: true
    },
    hst: {
        type: SchemaType.Decimal128,
        required: true,
        trim: true
    }
  
})

provinceSchema.virtual('businesses', {
    ref: 'Business',
    localField: '_id',
    foreignField: 'province'
})

const Province = mongoose.model("Province", provinceSchema)
module.exports = Province