const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  },
  {
    timestamps: true
  }
);

const Upload = mongoose.model("Upload", uploadSchema);
module.exports = Upload;
