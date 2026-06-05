import { updateProductStockService } from "../../services/product.service";

export const updateBranchInventory = asyncHandler(async (req, res) => {
  const { id: handledBy, branchId } = req.user;

  const { id } = req.params;
  const { action } = req.query;
  const { quantity, notes } = req.body;

  // 🔥 Validation
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  if (!action || !["IN", "OUT"].includes(action)) {
    return res.status(400).json({ message: "Invalid action (IN or OUT)" });
  }

  if (!quantity || quantity <= 0) {
    return res.status(400).json({
      message: "Quantity must be greater than 0",
    });
  }

  if (!handledBy) {
    return res.status(401).json({
      message: "Unauthorized: user not found",
    });
  }

  const result = await updateProductStockService({
    id: Number(id),
    branchId,
    action,
    quantity: Number(quantity),
    notes,
    handledBy,
  });

  if (!result) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({
    message: `Stock ${action === "IN" ? "added" : "deducted"} successfully`,
    data: result,
  });
});
