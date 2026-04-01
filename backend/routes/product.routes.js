import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  findProductByBarcode,
  productSummaryStats,
  findProductById,
  updateProductStock,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";

const router = express.Router();

router.post("/product", verifyToken, authorizeRoles("admin"), createProduct);
router.put("/product/:id", verifyToken, authorizeRoles("admin"), updateProduct);
router.put(
  "/product/:id/delete",
  verifyToken,
  authorizeRoles("admin"),
  deleteProduct,
);
router.put(
  "/product/:id/stock",
  verifyToken,
  authorizeRoles("admin"),
  updateProductStock,
);
router.get(
  "/products",
  verifyToken,
  authorizeRoles("admin", "staff"),
  getProducts,
);
router.get(
  "/product-scan/:barcode",
  verifyToken,
  authorizeRoles("admin", "staff"),
  findProductByBarcode,
);
router.get(
  "/product/stats",
  verifyToken,
  authorizeRoles("admin", "staff"),
  productSummaryStats,
);
router.get(
  "/product/:id",
  verifyToken,
  authorizeRoles("admin", "staff"),
  findProductById,
);

export default router;
