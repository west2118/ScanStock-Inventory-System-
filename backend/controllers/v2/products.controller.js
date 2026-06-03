import {
  createProductService,
  updateProductService,
  deleteProductService,
  getProductsService,
} from "../services/product.service.js";
import pool from "../config/db.js";
import { findProductByIdService } from "../services/product.service.js";
import { getProductSummaryStatsService } from "../services/product.service.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const product = await createProductService(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatZodErrors(error),
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product",
    });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await updateProductService(id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteProductService(id);

    console.log("Deleted: ", deleted);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

// GET
export const getProducts = async (req, res) => {
  const client = await pool.connect();

  try {
    const { page = 1, limit = 10, search, category, status } = req.query;

    const result = await getProductsService(client, {
      page: Number(page),
      limit: Number(limit),
      search,
      category,
      status,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  } finally {
    client.release();
  }
};

// GET
export const findProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await findProductByIdService(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("🔥 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

// --------- FIXING THE ESSENTIAL FIRST!----------
export const getProductsSummaryStats = async (req, res) => {
  try {
    const summaryStats = await getProductSummaryStatsService();
    return res.status(200).json(summaryStats);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};
