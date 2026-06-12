import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import {
  createOrder,
  getCustomerOrders,
} from "../controllers/v2/orders.controller.js";

const router = express.Router();

router.post("/orders", verifyToken, createOrder);
router.get("/orders", verifyToken, getCustomerOrders);

export default router;
