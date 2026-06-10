import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { createCheckout } from "../controllers/v2/checkout.controller.js";

const router = express.Router();

router.post("/checkout", verifyToken, createCheckout);

export default router;
