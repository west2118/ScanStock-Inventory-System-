import { z } from "zod";

const stockAdjustmentItemSchema = z.object({
  productId: z.number().int().positive("Product ID is required"),

  adjustmentType: z.enum(["IN", "OUT"]),

  quantity: z.number().int().positive("Quantity must be greater than 0"),

  remarks: z.string().trim().max(255).optional(),
});

export const createStockAdjustmentSchema = z
  .object({
    branchId: z.number().int().positive("Branch ID is required"),

    reason: z.string().trim().min(3, "Reason is required").max(500),

    items: z
      .array(stockAdjustmentItemSchema)
      .min(1, "At least one adjustment item is required"),
  })
  .strict();
