import {
  getWishlistService,
  addToWishlistService,
  removeFromWishlistService,
  removeBulkWishlistService,
  getWishlistCountService,
} from "../../services/wishlist.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const getWishlist = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(200).json([]);
  const customerId = req.user.id;
  const wishlist = await getWishlistService(customerId);
  return res.status(200).json(wishlist);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  await addToWishlistService({ customerId, productId });

  return res.status(200).json({ message: "Product added to wishlist" });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  await removeFromWishlistService({ customerId, productId });

  return res.status(200).json({ message: "Product removed from wishlist" });
});

export const removeBulkWishlist = asyncHandler(async (req, res) => {
  const customerId = req.user.id;
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds)) {
    return res.status(400).json({ message: "Valid product IDs array is required" });
  }

  await removeBulkWishlistService({ customerId, productIds });

  return res.status(200).json({ message: "Products removed from wishlist" });
});

export const getWishlistCount = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(200).json({ count: 0 });
  const customerId = req.user.id;
  const count = await getWishlistCountService(customerId);
  return res.status(200).json(count);
});
