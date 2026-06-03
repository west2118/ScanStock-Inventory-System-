import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { getDashboardData } from "../controllers/v1/dashboard.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  getDashboardData,
);
export default router;
