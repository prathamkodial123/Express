const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cart")
const Order = require("../models/order")
const OrderProduct = require("../models/orderProduct")
const TrainingClass = require("../models/trainingClass")

//@desc Create Training Class a user
//@route POST /api/tranining-class/
//@access publicRequest failed with status code 400
const addToCart = asyncHandler(async (req, res) => {
    const { itemId, planType, userId } = req.body;
    if (!planType || !itemId) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const cart = await Cart.create({ userId, planType, itemId });
    if (cart) {
        res.status(201).json({ message: "Added to cart" });
    } else {
        res.status(400).json({ message: "Unable add to cart" });
    }
});
const findAllCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const cart = await Cart.find({ userId });
    const cartList = [];
    if (cart && cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            const e = cart[i];
            const trainingClass = await TrainingClass.find({ _id: e.itemId });
            if (trainingClass && trainingClass.length > 0) {
                const t = trainingClass[0];
                const pt = planTypeList.find((d) => {
                    return d.value === e.planType;
                });
                let price = t.price * pt.planValue;
                const planName = pt.name;
                let ob = {
                    _id: e._id,
                    image: t.image,
                    title: t.title,
                    description: t.description,
                    price,
                    planName,
                    startTime: t.startTime,
                    endTime: t.endTime,
                }
                cartList.push(ob);
            }
        }
        res.status(200).json(cartList);
    } else {
        res.status(200).json([]);
    }
});
const removeToCart = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;
    if (id) {
        try {
            const result = await Cart.deleteOne({ _id: id, userId: userId });
            if (result.deletedCount > 0) {
                res.status(201).json({ message: "Removed from cart" });
            } else {
                res.status(404).json({ message: "Item not found in the cart" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(400).json({ message: "Unable to remove from cart" });
    }
});

const buyFromCart = asyncHandler(async (req, res) => {
    const orderList = req.body.orderList;
    const userId = req.body.userId;
    const payAmount = req.body.payAmount;
    try {
        if (orderList && orderList.length > 0) {
            const orderMaster = await Order.create({ userId, payAmount, payStatus: 'Success', payMode: 'UPI' });
            for (let i = 0; i < orderList.length; i++) {
                const order = orderList[i];
                const cartItem = await Cart.findOne({ _id: order._id, userId: order.userId });
                const product = await TrainingClass.findOne({ _id: cartItem.itemId });
                const pt = planTypeList.find((d) => {
                    return d.value === cartItem.planType;
                });
                let price = product.price * pt.planValue;
                const orderProduct = await OrderProduct.create({ userId, orderId: orderMaster._id, itemId: cartItem.itemId, planType: cartItem.planType, price: price });
                const result = await Cart.deleteOne({ _id: order._id, userId });
            }
        }
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

const planTypeList = [
    { value: 1, name: '1 Month', planValue: 1 },
    { value: 2, name: '3 Month', planValue: 3 },
    { value: 3, name: '6 Month', planValue: 6 },
    { value: 4, name: '1 Year', planValue: 12 },
];

module.exports = { addToCart, findAllCart, removeToCart, buyFromCart };
