const mongoose = require("mongoose");
const planTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("PlanType", planTypeSchema);
