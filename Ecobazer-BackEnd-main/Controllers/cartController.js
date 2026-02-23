const User = require("../models/User");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userAuthId).populate({
      path: "cart",
      populate: {
        path: "productId",
        model: "Product",
      },
    });

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      message: "User cart fetched",
      user,
    });
  } catch (error) {
    console.error("getCart Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, price } = req.body;
    const quantity = req.body.quantity || 1;
    
    console.log("Adding to cart - Product:", productId, "User:", req.userAuthId, "Quantity:", quantity, "Price:", price);

    if (!productId || !price) {
      return res.status(400).json({ status: "error", message: "Product ID and Price are required" });
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ status: "error", message: "Product not found" });
    }

    // Initialize cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    const productExist = user.cart.find((item) => {
      return item.productId && item.productId.toString() === productId.toString();
    });

    if (productExist) {
      return res.status(400).json({ status: "error", message: "Product already exists in cart" });
    }

    user.cart.push({
      productId: productId,
      quantity: Number(quantity),
      price: Number(price),
    });

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("addToCart Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

const updateCart = asyncHandler(async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req?.params?.id;

    if (!itemId || quantity === undefined) {
      return res.status(400).json({ status: "error", message: "Item ID and Quantity are required" });
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item._id && item._id.toString() === itemId.toString()
    );
    if (itemIndex === -1) {
      return res.status(404).json({ status: "error", message: "Item not found in cart" });
    }

    user.cart[itemIndex].quantity = Number(quantity);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Product updated in cart",
      user,
    });
  } catch (error) {
    console.error("updateCart Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  try {
    const itemId = req?.params?.id;
    if (!itemId) {
      return res.status(400).json({ status: "error", message: "Item ID is required" });
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const itemExist = user.cart.some((item) => item._id && item._id.toString() === itemId.toString());

    if (!itemExist) {
      return res.status(404).json({ status: "error", message: "Item not found in cart" });
    }

    await User.updateOne(
      { _id: req.userAuthId },
      { $pull: { cart: { _id: itemId } } }
    );

    res.status(200).json({
      status: "success",
      message: "Product removed from cart",
    });
  } catch (error) {
    console.error("removeItemFromCart Error:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = { getCart, addToCart, updateCart, removeItemFromCart };
