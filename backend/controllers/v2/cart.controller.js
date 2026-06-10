import {
  getCartService,
  addCartService,
  minusCartService,
  removeCartItemService,
} from "../../services/cart.service.js";
import { toggleSelectCartItemService } from "../../services/category.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const getCart = asyncHandler(async (req, res) => {
  const customerId = req.user.id;

  const cart = await getCartService(customerId);

  return res.status(200).json(cart);
});

export const addCart = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const cartItem = await addCartService({
    customerId,
    productId,
  });

  return res.status(200).json({
    message: "Product added to cart",
    cartItem,
  });
});

export const minusCart = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const cartItem = await minusCartService({
    customerId,
    productId,
  });

  return res.status(200).json({
    message: "Cart updated",
    cartItem,
  });
});

export const removeCartItem = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const removedItem = await removeCartItemService({
    customerId,
    productId,
  });

  return res.status(200).json({
    message: "Product removed from cart",
    removedItem,
  });
});

export const toggleSelectCartItem = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

  const cartItem = await toggleSelectCartItemService({
    customerId,
    productId,
  });

  return res.status(200).json({
    message: "Cart item selection updated",
    cartItem,
  });
});
