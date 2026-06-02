import express from "express";
import {
  createStockMovement,
  findStockMovementById,
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
  authorizeRoles("admin", "branch_manager", "staff"),
  createStockMovement,
);
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
