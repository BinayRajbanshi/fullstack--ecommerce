import express from "express";
import {
  placeOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderControllers.js";
import { verifyToken, admin } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, admin, getOrders);
router.put("/:id/deliver", verifyToken, admin, updateOrderToDelivered);
router.post("/", verifyToken, placeOrder);
router.get("/myorders", verifyToken, getMyOrders);
// big error if i put /myorders after /:id because /myorders will work as parameter
router.get("/:id", verifyToken, getOrderById);
router.put("/:id/pay", verifyToken, updateOrderToPaid);

export default router;
