import express from "express";
import {
  findStockMovementById,
  getStockMovements,
  inventoryMovementSummaryStats,
  inventorySummaryStats,
} from "../controllers/v1/stock.movement.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import {
  approveStockAdjustment,
  createStockAdjustment,
  getStockAdjustments,
  rejectStockAdjustment,
} from "../controllers/v2/stock.adjustment.controller.js";
import { validate } from "../middlewares/validate.js";
import { createStockAdjustmentSchema } from "../validations/stock.adjustment.validation.js";

const router = express.Router();

router.get(
  "/stock-adjustments",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getStockAdjustments,
);

router.post(
  "/stock-adjustments",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  validate(createStockAdjustmentSchema),
  createStockAdjustment,
);

router.put(
  "/stock-adjustments/:id/approve",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  approveStockAdjustment,
);

router.put(
  "/stock-adjustments/:id/reject",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  rejectStockAdjustment,
);

export default router;
