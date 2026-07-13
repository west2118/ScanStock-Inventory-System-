import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { getDashboardBranchPulseData, getDashboardData } from "../controllers/v2/dashboard.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  getDashboardData,
);

router.get(
  "/dashboard/branchPulse",
  verifyToken,
  authorizeRoles("central_admin"),
  getDashboardBranchPulseData,
);

export default router;
