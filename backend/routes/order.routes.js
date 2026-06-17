import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import {
  completeOrder,
  createOrder,
  deliverOrder,
  getBranchOrders,
  getCustomerOrders,
  processOrder,
  shipOrder,
  getBranchOrderStats,
  getCustomerOrderStats,
  getCustomerActiveOrderCount,
  cancelOrder,
  submitOrderReview,
} from "../controllers/v2/orders.controller.js";

const router = express.Router();

router.post("/orders", verifyToken, createOrder);
router.get("/orders/my-orders/stats", verifyToken, getCustomerOrderStats);
router.get("/orders/my-orders/count", verifyToken, getCustomerActiveOrderCount);
router.get("/orders/my-orders", verifyToken, getCustomerOrders);
router.get("/orders/branch/stats", verifyToken, getBranchOrderStats);
router.get("/orders/branch", verifyToken, getBranchOrders);
router.patch("/orders/:orderId/process", verifyToken, processOrder);
router.patch("/orders/:orderId/ship", verifyToken, shipOrder);
router.patch("/orders/:orderId/deliver", verifyToken, deliverOrder);
router.patch("/orders/:orderId/complete", verifyToken, completeOrder);
router.patch("/orders/:orderId/cancel", verifyToken, cancelOrder);
router.post("/orders/:orderId/review", verifyToken, submitOrderReview);

export default router;
