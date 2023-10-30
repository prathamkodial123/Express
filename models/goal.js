const mongoose = require("mongoose");
const goalTypeEnum = ["Gain Weight", "Loss Weight"];
const genderEnum = ["M", "F"];
const goalSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    currentWeight: {
        type: Number,
        required: true,
    },
    targetWeight: {
        type: Number,
        required: true,
    },
    targetDays: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    goalWeight: {
        type: Number,
    },
    goalType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Goal", goalSchema);

