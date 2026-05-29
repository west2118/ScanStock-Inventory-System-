import express from "express";
import { getReports } from "../controllers/report.controller.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get(
  "/reports",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  getReports,
);

export default router;
