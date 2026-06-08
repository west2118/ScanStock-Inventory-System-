import { asyncHandler } from "../../utils/helper.js";
import pool from "../../config/db.js";
import {
  createProductService,
  findProductByBarcodeService,
  getCollectionsService,
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

    branchId: req.user.branchId,
  });

  return res.status(200).json(products);
});

// FIND PRODUCT USING BARCODE
export const findProductByBarcode = asyncHandler(async (req, res) => {
  const { branchId } = req.user;
  const { barcode } = req.params;

  if (!barcode) {
    return res.status(400).json({
      success: false,
      message: "Barcode is required",
    });
  }

  const product = await findProductByBarcodeService(barcode, branchId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      action: "CREATE_PRODUCT",
    });
  }

  res.json({
    message: "Product Scanned Successfully!",
    data: product,
  });
});

// GET COLLECTIONS
export const getCollections = asyncHandler(async (req, res) => {
  const products = await getCollectionsService({
    page: Number(req.query.page) || 1,
    limit: Number(req.query.limit) || 10,
    search: req.query.search,
    categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
    brandId: req.query.brandId ? Number(req.query.brandId) : undefined,
    status: req.query.status,
  });

  return res.status(200).json(products);
});

// GET PRODUCT BY ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await getProductByIdService(id);

  return res.status(200).json(product);
});
