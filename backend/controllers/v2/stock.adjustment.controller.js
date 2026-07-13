import {
  approveStockAdjustmentService,
  createStockAdjustmentService,
  getStockAdjustmentsService,
  rejectStockAdjustmentService,
} from "../../services/stock.adjustment.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createStockAdjustment = asyncHandler(async (req, res) => {
  const adjustment = await createStockAdjustmentService({
    ...req.validatedBody,
    createdBy: req.user.id,
    branchId: req.user.branchId,
  });

  res.status(201).json({
    success: true,
    message: "Stock adjustment created successfully",
    data: adjustment,
  });
});

export const approveStockAdjustment = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: "Reason is required" });
  }

  await approveStockAdjustmentService({
    adjustmentId: Number(req.params.id),
    handledBy: req.user.id,
    reason,
  });

  res.status(200).json({
    success: true,
    message: "Stock adjustment approved successfully",
  });
});

export const rejectStockAdjustment = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: "Reason is required" });
  }

  const adjustment = await rejectStockAdjustmentService({
    adjustmentId: Number(req.params.id),
    handledBy: req.user.id,
    reason,
  });

  res.status(200).json({
    success: true,
    message: "Stock adjustment rejected successfully",
    data: adjustment,
  });
});

export const getStockAdjustments = asyncHandler(async (req, res) => {
  const { branchId } = req.user;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await getStockAdjustmentsService({
    page,
    limit,
    search: req.query.search,
    status: req.query.status,
    branchId,
  });

  res.status(200).json(result);
});
