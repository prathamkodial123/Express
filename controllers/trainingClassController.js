const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TrainingClass = require("../models/trainingClass")

//@desc Create Training Class a user
//@route POST /api/tranining-class/
//@access publicRequest failed with status code 400
const createTrainingClass = asyncHandler(async (req, res) => {
    const { image, description, title, price, startDate, endDate, startTime, endTime } = req.body;
    if (!image || !description || !title || !price || !startDate || !endDate || !startTime || !endTime) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const trainingClass = await TrainingClass.create({ image, description, title, price, startDate, endDate, startTime, endTime });
    if (trainingClass) {
        res.status(201).json({ _id: trainingClass._id });
    } else {
        res.status(400).json({ message: "Training class not valid" });
    }
});

const findAllTrainingClasses = asyncHandler(async (req, res) => {
    const trainingClasses = await TrainingClass.find();
    if (trainingClasses && trainingClasses.length > 0) {
        res.status(200).json(trainingClasses);
    } else {
        res.status(404).json({ message: "No training classes found" });
    }
});

const get = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    if (_id) {
        const classes = await TrainingClass.findOne({ _id });
        if (classes) {
            res.status(200).json(classes);
        } else {
            res.status(400);
            throw new Error("No classes found");
        }
    } else {
        res.status(400);
        throw new Error("No classes found");
    }
});
module.exports = { createTrainingClass, findAllTrainingClasses, get };
