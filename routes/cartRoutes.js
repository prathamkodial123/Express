const express = require("express");
const { addToCart, findAllCart, removeToCart, buyFromCart } = require("../controllers/cartController");
const router = express.Router();
router.post("", addToCart);
router.post("/user-cart", findAllCart);
router.delete("/:userId/:id", removeToCart);
router.post("/buy", buyFromCart);

module.exports = router;
