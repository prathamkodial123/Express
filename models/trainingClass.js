const mongoose = require("mongoose");

const trainingClassSchema = mongoose.Schema({
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    isAvailable: {
        type: Number,
        default: 1
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    startTime: {
        type: String, // If you want just the time, you can use String and handle it as a time string
    },
    endTime: {
        type: String, // If you want just the time, you can use String and handle it as a time string
    },
});

module.exports = mongoose.model("TrainingClass", trainingClassSchema);
