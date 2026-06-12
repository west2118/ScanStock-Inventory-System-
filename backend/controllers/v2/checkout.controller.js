import {
  createCheckoutService,
  getCheckoutSessionItemsService,
} from "../../services/checkout.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createCheckout = asyncHandler(async (req, res) => {
  const customerId = req.user.id;

  const checkout = await createCheckoutService(customerId);

  return res.status(201).json({
    message: "Checkout session created",
    ...checkout,
  });
});

export const getCheckoutSessionItems = asyncHandler(async (req, res) => {
  const items = await getCheckoutSessionItemsService(req.params.id);

  return res.status(200).json(items);
});
