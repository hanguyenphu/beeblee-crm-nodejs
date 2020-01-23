const mongoose = require("mongoose");
const SchemaType = mongoose.Schema.Types;

const accountSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    startDate: {
      type: Date
    },
    expireDate: {
      type: Date
    },
    price: {
      type: SchemaType.Decimal128
    },
    description: {
      type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
  }
);
const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
