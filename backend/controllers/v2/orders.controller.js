import { createOrderService } from "../../services/order.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createOrder = asyncHandler(async (req, res) => {
  const customerId = req.user.id;

  const result = await createOrderService({
    customerId,
    ...req.body,
  });

  res.status(201).json({
    success: true,
    ...result,
  });
});
