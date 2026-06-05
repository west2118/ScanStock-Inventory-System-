import { asyncHandler } from "../../utils/helper.js";
import pool from "../../config/db.js";
import {
  createProductService,
  getProductByIdService,
  getProductsService,
  updateProductService,
} from "../../services/product.service.js";

// CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {
  const product = await createProductService(req.validatedBody);

  return res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await updateProductService(req.params.id, req.validatedBody);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
});

// DELETE PRODUCT
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await deleteProductService(req.params.id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// GET PRODUCTS
export const getProducts = asyncHandler(async (req, res) => {
  const products = await getProductsService({
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    search: req.query.search,
    categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
    brandId: req.query.brandId ? Number(req.query.brandId) : undefined,
    status: req.query.status,
  });

  return res.status(200).json({
    success: true,
    data: products,
  });
});

// GET PRODUCT BY ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await getProductByIdService(Number(id));

  return res.status(200).json({
    success: true,
    data: product,
  });
});
