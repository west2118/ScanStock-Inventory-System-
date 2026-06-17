import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  removeBulkWishlist,
  getWishlistCount,
} from "../controllers/v2/wishlist.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

router.get("/wishlist", getWishlist);
router.get("/wishlist/count", getWishlistCount);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.post("/wishlist/remove-bulk", removeBulkWishlist);

export default router;
