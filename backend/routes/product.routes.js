import express from "express";
import {
  findProductByBarcode,
  productSummaryStats,
  findProductById,
  updateProductStock,
  getProductsPOS,
} from "../controllers/v1/product.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import { validate } from "../middlewares/validate.js";
import { createProductSchema } from "../validations/product.validation.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/v2/products.controller.js";

const router = express.Router();

router.post("/products", validate(createProductSchema), createProduct);
router.put(
  "/products/:id",
  verifyToken,
  validate(createProductSchema),
  updateProduct,
);
router.put("/products/:id/delete", verifyToken, deleteProduct);
router.get("/products", verifyToken, getProducts);
router.get("/products/:id", verifyToken, getProductById);

// router.put(
//   "/product/:id",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager"),
//   updateProduct,
// );
// router.put(
//   "/product/:id/delete",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager"),
//   deleteProduct,
// );
// router.put(
//   "/product/:id/stock",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager"),
//   updateProductStock,
// );
// router.get(
//   "/products",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager", "staff"),
//   getProducts,
// );
// router.get(
//   "/products/listed",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager", "staff"),
//   getProductsPOS,
// );
// router.get(
//   "/product-scan/:barcode",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager", "staff"),
//   findProductByBarcode,
// );
// router.get(
//   "/product/stats",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager", "staff"),
//   productSummaryStats,
// );
// router.get(
//   "/product/:id",
//   verifyToken,
//   authorizeRoles("admin", "branch_manager", "staff"),
//   findProductById,
// );

export default router;
