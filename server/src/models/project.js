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
    googleLink: {
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
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

projectSchema.virtual('accounts', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'project'
})

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
