const mongoose = require("mongoose");

const userInfoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.UUID,
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'O'],
        required: true,
        length: 1
    },
    mobileNo: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^\d{10}$/.test(value),
            message: 'Invalid mobile number',
        },
    },
    emergencyMobileNo: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("UserInfo", userInfoSchema);
