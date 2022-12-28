import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

// @desc  Crete new Order
// @route POST /api/orders
// @access Protected
export const placeOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.data._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const ordered = await order.save();
    res.status(201).json(ordered);
  }
});

// @desc  get Order by id
// @route POST /api/orders/:id
// @access Protected
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order does not exist");
  }
});

// @desc  Change order to paid
// @route PUT /api/:id/pay
// @access Protected
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
      intent: req.body.intent,
      payer_name: req.body.payer.name.given_name,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc  update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Protected/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

// @desc  gets the order of logged in user
// @route PUT /api/orders/myorders
// @access Protected
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.data._id });
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("No orders found");
  }
});

// @desc  gets all orders by admin
// @route GET /api/orders
// @access Protected/admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "_id name");
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400);
    throw new Error("Orders not found");
  }
});
