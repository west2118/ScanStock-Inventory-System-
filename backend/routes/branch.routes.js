import express from "express";
import {
  createBranch,
  deleteBranch,
  getBranches,
  getBranchesCharts,
  getBranchesSummaryStats,
  getBranchOptions,
  updateBranch,
} from "../controllers/v2/branch.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createBranchSchema,
  updateBranchSchema,
} from "../validations/branch.validation.js";

const router = express.Router();

router.post("/branches", validate(createBranchSchema), createBranch);
router.put("/branches/:id", validate(updateBranchSchema), updateBranch);
router.put("/branches/:id/delete", deleteBranch);
router.get("/branches", getBranches);
router.get("/branches-stats", getBranchesSummaryStats);
router.get("/branches-charts", getBranchesCharts);
router.get("/branches-options", getBranchOptions);

export default router;
