import { createCheckoutService } from "../../services/checkout.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createCheckout = asyncHandler(async (req, res) => {
  const customerId = req.user.id;

  const checkout = await createCheckoutService(customerId);

  return res.status(201).json({
    message: "Checkout session created",
    ...checkout,
  });
});
