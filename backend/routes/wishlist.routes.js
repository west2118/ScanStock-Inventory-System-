import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  removeBulkWishlist,
  getWishlistCount,
} from "../controllers/v2/wishlist.controller.js";
import { verifyToken, optionalVerifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/wishlist", optionalVerifyToken, getWishlist);
router.get("/wishlist/count", optionalVerifyToken, getWishlistCount);
router.post("/wishlist", verifyToken, addToWishlist);
router.delete("/wishlist/:productId", verifyToken, removeFromWishlist);
router.post("/wishlist/remove-bulk", verifyToken, removeBulkWishlist);

export default router;
