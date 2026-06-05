import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/v2/categories.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const router = express.Router();

router.post("/categories", validate(createCategorySchema), createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id/delete", deleteCategory);
router.put("/categories/:id", validate(updateCategorySchema), updateCategory);

export default router;
