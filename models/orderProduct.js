const mongoose = require("mongoose");

const orderProductSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true,
    },
    planType: {
        type: Number,
    },
    price: {
        type: Number,
    },
});

module.exports = mongoose.model("OrderProduct", orderProductSchema);
