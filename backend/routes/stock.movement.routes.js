import express from "express";
import {
  createStockMovement,
  findStockMovementById,
  getDashboardData,
  getStockMovements,
  inventoryMovementSummaryStats,
  inventorySummaryStats,
} from "../controllers/stock.movement.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";

const router = express.Router();

router.post(
  "/stock-movement/in",
  verifyToken,
  authorizeRoles("admin", "staff"),
  createStockMovement,
);
router.get(
  "/stock-movements",
  verifyToken,
  authorizeRoles("admin", "staff"),
  getStockMovements,
);
router.get(
  "/stock-movement/:id",
  verifyToken,
  authorizeRoles("admin", "staff"),
  findStockMovementById,
);

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("admin", "staff"),
  getDashboardData,
);
router.get(
  "/inventory/stats",
  verifyToken,
  authorizeRoles("admin", "staff"),
  inventorySummaryStats,
);
router.get(
  "/movements/stats",
  verifyToken,
  authorizeRoles("admin", "staff"),
  inventoryMovementSummaryStats,
);

export default router;
