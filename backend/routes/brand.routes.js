import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorizeRoles } from "../middlewares/authRole.js";
import {
  createBrand,
  deleteBrand,
  getBrands,
  getBrandById,
  updateBrand,
} from "../controllers/v2/brands.controller.js";
import { validate } from "../middlewares/validate.js";
import { createBrandSchema } from "../validations/brand.validation.js";

const router = express.Router();

router.post("/brands", validate(createBrandSchema), createBrand);
router.get("/brands", getBrands);
router.get("/brands/:id", getBrandById);
router.put("/brands/:id/delete", deleteBrand);
router.put("/brands/:id", validate(createBrandSchema), updateBrand);

export default router;
