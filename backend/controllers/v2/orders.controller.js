import {
  createOrderService,
  getCustomerOrdersService,
} from "../../services/order.service.js";
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

export const getCustomerOrders = asyncHandler(async (req, res) => {
  const result = await getCustomerOrdersService({
    customerId: req.user.id,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
  });

  return res.status(200).json(result);
});
