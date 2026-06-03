import {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
  deleteBrandService,
} from "../../services/brand.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createBrand = asyncHandler(async (req, res) => {
  const brand = await createBrandService(req.validatedBody);

  return res.status(201).json({
    success: true,
    message: "Brand created successfully",
    data: brand,
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await updateBrandService(req.params.id, req.validatedBody);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Brand updated successfully",
    data: brand,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await deleteBrandService(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Brand deleted successfully",
  });
});

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await getBrandsService();

  return res.status(200).json({
    success: true,
    count: brands.length,
    data: brands,
  });
});

export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await getBrandByIdService(req.params.id);

  if (!brand) {
    return res.status(404).json({
      success: false,
      message: "Brand not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: brand,
  });
});
