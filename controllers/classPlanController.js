const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ClassPlan = require("../models/classPlan")

//@desc Create Training Class a user
//@route POST /api/tranining-class/
//@access publicRequest failed with status code 400
const createClassPlan = asyncHandler(async (req, res) => {
    const { itemId, planType, userId } = req.body;
    if (!planType || !itemId) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const cart = await ClassPlan.create({ userId, planType, itemId });
    if (cart) {
        res.status(201).json({ message: "Class plan added" });
    } else {
        res.status(400).json({ message: "Unable add" });
    }
});

const findAllClassPlan = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const cart = await ClassPlan.find({ active: 'Y' });
    if (cart && cart.length > 0) {
        res.status(200).json(cart);
    } else {
        res.status(200).json([]);
    }
});

module.exports = { createClassPlan, findAllClassPlan };
