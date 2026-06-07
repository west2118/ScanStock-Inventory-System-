import express from "express";
import {
  findStockMovementById,
  inventoryMovementSummaryStats,
  inventorySummaryStats,
} from "../controllers/v1/stock.movement.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { getStockMovements } from "../controllers/v2/stock.movement.controller.js";

const router = express.Router();

router.get(
  "/stock-movements",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getStockMovements,
);
router.get(
  "/stock-movement/:id",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  findStockMovementById,
);
router.get(
  "/inventory/stats",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  inventorySummaryStats,
);
router.get(
  "/movements/stats",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  inventoryMovementSummaryStats,
);

export default router;
