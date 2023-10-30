const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Calory = require("../models/goal");
const UserCalory = require("../models/userCalory");

const createGoal = asyncHandler(async (req, res) => {
    try {
        const { userId, age, gender } = req.body;
        const currentWeight = parseFloat(req.body.currentWeight);
        const height = parseFloat(req.body.height);
        const targetWeight = parseFloat(req.body.targetWeight);
        const targetDays = parseInt(req.body.targetDays);
        let goalType = '';
        let goalWeight = 0;
        if (currentWeight > targetWeight) {
            goalType = 'Loss Weight';
            goalWeight = currentWeight - targetWeight;
        } else {
            goalType = 'Gain Weight';
            goalWeight = targetWeight - currentWeight;
        }
        const goal = await Calory.create({ userId: userId, age: age, gender: gender, currentWeight: currentWeight, targetWeight: targetWeight, targetDays: targetDays, height: height, goalWeight: goalWeight, goalType: goalType });
        res.status(201).json({ success: true, data: goal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Goal creation failed' });
    }
});

const createCalories = asyncHandler(async (req, res) => {
    try {
        const { userId, calory } = req.body;
        const userCalories = await UserCalory.create({ userId, calory });
        res.status(201).json({ success: true, data: userCalories });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Calory creation failed' });
    }
});

const updateCalories = asyncHandler(async (req, res) => {
    try {
        const { userId, calory } = req.body;
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const caloryToDelete = await UserCalory.findOneAndDelete({
            userId,
            date: { $eq: currentDate },
        });
        const userCalories = await UserCalory.create({ userId, calory });
        res.status(201).json({ success: true, data: userCalories });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Unable to update calory' });
    }
});

const exitsGoal = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const goal = await Calory.findOne({ userId });
        if (goal) {
            res.status(200).json({ exists: true, goal });
        } else {
            res.status(200).json({ exists: false });
        }
    } else {
        res.status(400);
        throw new Error("goal not found");
    }
});
const exitsTodayCalory = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (userId) {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const caloryAvailable = await UserCalory.findOne({
            userId,
            date: { $eq: currentDate },
        });

        if (caloryAvailable) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } else {
        res.status(400).json({ error: "Invalid userId" });
    }
});
const findLastWeekCalories = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const weekCalories = await UserCalory.find({
        userId: userId,
        date: { $gte: lastWeek, $lte: new Date() }
    });
    const transformedData = transformCaloriesData(weekCalories);
    res.status(200).json(transformedData);
});

// const transformCaloriesData = (weekCalories) => {
//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//     // Create an array with 7 objects representing each day of the week
//     const transformedData = daysOfWeek.map((day, index) => {
//         // Find the matching record in weekCalories based on the day of the week
//         const matchingRecord = weekCalories.find((record) => {
//             const recordDate = new Date(record.date);
//             return recordDate.getDay() === index;
//         });
//         // If a matching record exists, extract the 'calory' field; otherwise, set it to 0
//         const calory = matchingRecord ? matchingRecord.calory : 0;
//         return { calory, day };
//     });

//     return transformedData;
// };
const transformCaloriesData = (weekCalories) => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create an array with 7 objects representing each day of the week
    const transformedData = daysOfWeek.map((day, index) => {
        // Calculate the date for the current day
        const today = new Date();
        today.setDate(today.getDate() - (today.getDay() - index + 7) % 7);

        // Find the matching record in weekCalories based on the calculated date
        const matchingRecord = weekCalories.find((record) => {
            const recordDate = new Date(record.date);
            return (
                recordDate.getDate() === today.getDate() &&
                recordDate.getMonth() === today.getMonth() &&
                recordDate.getFullYear() === today.getFullYear()
            );
        });

        // If a matching record exists, extract the 'calory' field; otherwise, set it to 0
        const calory = matchingRecord ? matchingRecord.calory : 0;

        // Get the day of the month
        const dayOfMonth = today.getDate();

        return { calory, day: `${day} ${dayOfMonth}` };
    });

    return transformedData;
};

module.exports = { createGoal, findLastWeekCalories, exitsGoal, createCalories, exitsTodayCalory, updateCalories };
