import express from "express";
import { verifyToken, optionalVerifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validate.js";
import {
  addCart,
  getCart,
  minusCart,
  removeCartItem,
  toggleSelectCartItem,
  getCartCount,
} from "../controllers/v2/cart.controller.js";

const router = express.Router();

router.get("/carts", optionalVerifyToken, getCart);
router.get("/carts/count", optionalVerifyToken, getCartCount);
router.post("/carts/add", verifyToken, addCart);
router.post("/carts/minus", verifyToken, minusCart);
router.delete("/carts/remove", verifyToken, removeCartItem);
router.patch("/carts/select", verifyToken, toggleSelectCartItem);

export default router;
