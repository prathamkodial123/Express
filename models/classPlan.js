const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const claaPlanSchema = new Schema({
    _id: {     // Set _id to false to disable auto-generated _id
        type: mongoose.Schema.Types.UUID,
        default: () => uuidv4(), // You can provide your own UUID generation logic here
    },
    planType: {
        type: String, // Use String for planType
        required: true,
        unique: true, // Ensure planType is unique
    },
    planName: {
        type: String,
        required: true,
    },
    active: {
        type: String,
        default: 'Y'
    },
});

module.exports = mongoose.model("ClassPlan", claaPlanSchema);
