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
  getProductsPOS,
} from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";

const router = express.Router();

router.post("/product", createProduct);
router.put(
  "/product/:id",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  updateProduct,
);
router.put(
  "/product/:id/delete",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  deleteProduct,
);
router.put(
  "/product/:id/stock",
  verifyToken,
  authorizeRoles("admin", "branch_manager"),
  updateProductStock,
);
router.get(
  "/products",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getProducts,
);
router.get(
  "/products/listed",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  getProductsPOS,
);
router.get(
  "/product-scan/:barcode",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  findProductByBarcode,
);
router.get(
  "/product/stats",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  productSummaryStats,
);
router.get(
  "/product/:id",
  verifyToken,
  authorizeRoles("admin", "branch_manager", "staff"),
  findProductById,
);

export default router;
