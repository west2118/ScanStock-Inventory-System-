import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import { createOrder } from "../controllers/v2/orders.controller.js";

const router = express.Router();

router.post("/orders", createOrder);

export default router;
