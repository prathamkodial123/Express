const mongoose = require("mongoose");

const userCalorySchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    calory: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        // default: () => new Date().toLocaleDateString(),
        // default: Date.now,
        default: () => {
            const currentDate = new Date();
            currentDate.setUTCHours(0, 0, 0, 0);
            return currentDate;
        },
    },
});

module.exports = mongoose.model("UserCalory", userCalorySchema);
