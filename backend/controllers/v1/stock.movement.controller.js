import pool from "../../config/db.js";
import { getDashboardSummaryStatsService } from "../../services/dashboard.service.js";
import {
  createStockMovementService,
  findStockMovementByIdService,
  getStockMovementsService,
  inventoryMovementSummaryStatsService,
  inventorySummaryStatsService,
} from "../../services/stock.movement.service.js";

export const getStockMovements = async (req, res) => {
  const { branchId } = req.user;

  try {
    const { page = 1, limit = 10, search, category, type } = req.query;

    const result = await getStockMovementsService({
      page: Number(page),
      limit: Number(limit),
      search,
      category,
      type,
      branchId,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch stock movements",
    });
  }
};

export const inventorySummaryStats = async (req, res) => {
  const { branchId } = req.user;

  try {
    const result = await inventorySummaryStatsService(branchId);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const inventoryMovementSummaryStats = async (req, res) => {
  const { branchId } = req.user;

  try {
    const result = await inventoryMovementSummaryStatsService(branchId);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const findStockMovementById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Stock ID: ", id);

    const stockMovement = await findStockMovementByIdService(id);

    if (!stockMovement) {
      return res.status(404).json({
        success: false,
        message: "StockMovement not found",
      });
    }

    return res.json(stockMovement);
  } catch (error) {
    console.error("🔥 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};
