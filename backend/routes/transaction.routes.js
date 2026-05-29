import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import {
  createTransaction,
  getTransactions,
  getTransactionSummaryCards,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.post(
  "/transactions",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  createTransaction,
);
router.get(
  "/transactions/summary-cards",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getTransactionSummaryCards,
);
router.get(
  "/transactions",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getTransactions,
);

export default router;
