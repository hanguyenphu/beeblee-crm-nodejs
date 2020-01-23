const mongoose = require("mongoose");
const validator = require("validator");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email!");
        }
      }
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Province"
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
      }
    ]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

businessSchema.methods.addContact = async function(contactId) {
  const business = this;
  business.contacts.push(contactId);
  await business.save();
  return business;
};

businessSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'business'
})

const Business = mongoose.model("Business", businessSchema);
module.exports = Business;
