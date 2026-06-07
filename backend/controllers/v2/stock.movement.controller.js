import { getStockMovementsService } from "../../services/stock.movement.service.js";

import { asyncHandler } from "../../utils/helper.js";

export const getStockMovements = asyncHandler(async (req, res) => {
  const { branchId } = req.user;

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
});
