const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain "password');
            }
        }
    },
    active: {
        type: Boolean,
        default: true
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Invalid phone number");
            }
        }
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum: ["user", "admin"]
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

}, {
    toJSON: {
        virtuals: true
    }
});



//hash password before saving
userSchema.pre("save", async function(next) {
    const user = this;

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'crmbeeblee');

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
};

userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Email or Password is incorrect')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error ('Email or Password is incorrect')
    }

    return user
}

//hide private info from user
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
