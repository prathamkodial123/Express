const mongoose = require("mongoose");

const userSubscriptionSchema = mongoose.Schema({
    userId: {
        type: String, // Use the appropriate data type for userId
        required: true,
    },
    orderProductId: {
        type: String, // Use the appropriate data type for orderProductId
        required: true,
    },
    itemId: {
        type: String, // Use the appropriate data type for productId
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    subscriptionDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("UserSubscription", userSubscriptionSchema);
