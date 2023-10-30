const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    userId: {
        type:String,
        // type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    itemId: {
        type:String,
        // type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    addDate: {
        type: Date,
        default: Date.now,
    },
    planType: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
