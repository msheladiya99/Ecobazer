const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrders,
} = require("../Controllers/orderController");
const isLoggedin = require("../middlewares/isLoggedin");

router.route("/").post(isLoggedin, addOrderItems);
router.route("/myorders").get(isLoggedin, getMyOrders);
router.route("/:id").get(isLoggedin, getOrderById);

module.exports = router;
