const mongoose = require("mongoose");
const orderStatusEnum = ["Success", "Cancel"];
const orderPayModeEnum = ["UPI", "CASH", "ONLINE"];
const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    payAmount: {
        type: Number,
        required: true,
    },
    payStatus: {
        type: String,
        enum: orderStatusEnum,
    },
    payMode: {
        type: String,
        enum: orderPayModeEnum
    },
    orderTime: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Order", orderSchema);
