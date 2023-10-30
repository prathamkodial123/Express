const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OrderProduct = require("../models/orderProduct")
const TrainingClass = require("../models/trainingClass")
const Subscription = require("../models/userSubscription")

const findAllSubscription = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const productList = await OrderProduct.find({ userId });
    const cartList = [];
    if (productList && productList.length > 0) {
        for (let i = 0; i < productList.length; i++) {
            const product = productList[i];
            const trainingClass = await TrainingClass.find({ _id: product.itemId });
            if (trainingClass && trainingClass.length > 0) {
                const t = trainingClass[0];
                const pt = planTypeList.find((d) => {
                    return d.value === product.planType;
                });
                let active = false;
                let startDate = '';
                let endDate = '';

                const sub = await Subscription.find({ itemId: product.itemId, userId, orderProductId: product._id });
                if (sub && sub.length > 0) {
                    let s = sub[0];
                    let sysLast = new Date();
                    let subLast = new Date(s.endDate);
                    if (subLast.getTime() > sysLast.getTime()) {
                        active = true;
                        startDate = formatDate(new Date(s.startDate));
                        endDate = formatDate(new Date(s.endDate));
                    } else {
                        active = false;
                    }
                }
                let price = t.price * pt.planValue;
                const planName = pt.name;
                let ob = {
                    _id: product._id,
                    image: t.image,
                    title: t.title,
                    description: t.description,
                    price,
                    planName,
                    startTime: t.startTime,
                    endTime: t.endTime,
                    active,
                    startDate,
                    endDate
                }
                cartList.push(ob);
            }
        }
        res.status(200).json(cartList);
    } else {
        res.status(200).json([]);
    }
});
const activeSub = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const orderProduct = await OrderProduct.findById(id);
            const pt = planTypeList.find((d) => {
                return d.value === orderProduct.planType;
            });
            const subS = await Subscription.find({ itemId: orderProduct.itemId, userId: orderProduct.userId });
            if (subS && subS.length > 0) {
                let s = subS[0];
                let curEndDate = new Date(s.endDate) //15
                let sysDate = new Date();//10
                console.log(curEndDate.getTime() > sysDate.getTime());
                if (curEndDate.getTime() > sysDate.getTime()) {
                    res.status(200).json({ exists: true });
                }
            }
            let startDate = new Date();
            let endDate = new Date(new Date().setDate(startDate.getDate() + pt.days));
            let sub = {
                userId: orderProduct.userId,
                orderProductId: orderProduct._id,
                itemId: orderProduct.itemId,
                startDate,
                endDate,
            }
            const saveSub = await Subscription.create(sub);
            res.status(200).json({ exists: false });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(400).json({ message: "Unable to active subscription" });
    }
});

const isActivateSubId = asyncHandler(async (req, res) => {
    const { opId } = req.body;
    if (opId) {
        const orderProduct = await OrderProduct.findById(opId);
        const userSub = await Subscription.findOne({ itemId: orderProduct.itemId });
        if (userSub) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } else {
        res.status(400);
        throw new Error("Unable to find ");
    }
});


const findAllSchedule = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const subList = await Subscription.find({ userId });
    const scheduleList = [];
    for (let i = 0; i < subList.length; i++) {
        const sub = subList[i];
        const trainingClass = await TrainingClass.find({ _id: sub.itemId })
        const schedule = [];
        schedule.push(formatDate(new Date(sub.startDate)));
        schedule.push(formatDate(new Date(sub.endDate)));
        schedule.push(trainingClass[0].title);
        schedule.push(trainingClass[0].description);
        schedule.push(trainingClass[0].startTime);
        schedule.push(trainingClass[0].endTime);
        scheduleList.push(schedule);
    }
    res.status(200).json(scheduleList);

});
const formatDate = (date) => {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const planTypeList = [
    { value: 1, name: '1 Month', planValue: 1, days: 30 },
    { value: 2, name: '3 Month', planValue: 3, days: 90 },
    { value: 3, name: '6 Month', planValue: 6, days: 180 },
    { value: 4, name: '1 Year', planValue: 12, days: 365 },
];

module.exports = { findAllSubscription, activeSub, isActivateSubId, findAllSchedule };
