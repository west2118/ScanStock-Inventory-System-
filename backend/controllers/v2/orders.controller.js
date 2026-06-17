import {
  completeOrderService,
  createOrderService,
  getBranchOrdersService,
  getCustomerOrdersService,
  processOrderService,
  shipOrderService,
  deliverOrderService,
  getOrderSummaryStatsService,
  getCustomerOrderStatsService,
  getCustomerActiveOrderCountService,
  cancelOrderService,
  submitOrderReviewService,
} from "../../services/order.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const getBranchOrderStats = asyncHandler(async (req, res) => {
  const branchId = req.user.branchId;

  if (!branchId) {
    return res.status(400).json({
      message: "User branchId is required",
    });
  }

  const stats = await getOrderSummaryStatsService(branchId);
  return res.status(200).json(stats);
});

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
    status: req.query.status || "all",
    search: req.query.search || "",
  });

  return res.status(200).json(result);
});

export const getCustomerOrderStats = asyncHandler(async (req, res) => {
  const stats = await getCustomerOrderStatsService(req.user.id);
  return res.status(200).json(stats);
});

export const getCustomerActiveOrderCount = asyncHandler(async (req, res) => {
  const count = await getCustomerActiveOrderCountService(req.user.id);
  return res.status(200).json(count);
});

export const getBranchOrders = asyncHandler(async (req, res) => {
  const branchId = req.user.branchId;

  if (!branchId) {
    return res.status(400).json({
      message: "User branchId is required",
    });
  }

  const orders = await getBranchOrdersService({
    branchId,
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    status: req.query.status || "all",
    search: req.query.search || "",
    payment: req.query.payment || "all",
    date: req.query.date || "all",
  });

  return res.status(200).json(orders);
});

export const processOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const result = await processOrderService({
    orderId: Number(orderId),
    branchId: req.user.branchId,
    userId: req.user.id,
  });

  return res.status(200).json(result);
});

export const shipOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { trackingNumber, courierName } = req.body;

  const result = await shipOrderService({
    orderId: Number(orderId),
    branchId: req.user.branchId,
    userId: req.user.id,
    trackingNumber,
    courierName,
  });

  return res.status(200).json(result);
});

export const deliverOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const result = await deliverOrderService({
    orderId: Number(orderId),
    branchId: req.user.branchId,
    userId: req.user.id,
  });

  return res.status(200).json(result);
});

export const completeOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const result = await completeOrderService({
    orderId: Number(orderId),
    customerId: req.user.id,
  });

  return res.status(200).json(result);
});

export const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { reason } = req.body;

  const result = await cancelOrderService({
    orderId: Number(orderId),
    customerId: req.user.id,
    reason,
  });

  return res.status(200).json(result);
});

export const submitOrderReview = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { reviews } = req.body;

  const result = await submitOrderReviewService({
    orderId: Number(orderId),
    customerId: req.user.id,
    reviews,
  });

  return res.status(200).json(result);
});

