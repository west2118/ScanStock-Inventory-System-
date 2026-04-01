import { ZodError } from "zod";
import {
  createProductService,
  updateProductService,
  deleteProductService,
  getProductsService,
  findProductByBarcodeService,
  productSummaryStatsService,
  findProductByIdService,
  updateProductStockService,
} from "../services/product.service.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";
import { formatZodErrors } from "../utils/helper.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const validated = createProductSchema.parse(req.body);

    const product = await createProductService(validated);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("🔥 FULL ERROR:", error);

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
    const validated = updateProductSchema.parse(req.body);

    const updated = await updateProductService(id, validated);

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
  try {
    const { page = 1, limit = 10, search, category, status } = req.query;

    const result = await getProductsService({
      page: Number(page),
      limit: Number(limit),
      search,
      category,
      status,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

// FIND PRODUCT USING BARCODE
export const findProductByBarcode = async (req, res) => {
  const { barcode } = req.params;

  try {
    if (!barcode) {
      return res.status(400).json({
        success: false,
        message: "Barcode is required",
      });
    }

    const product = await findProductByBarcodeService(barcode);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const productSummaryStats = async (req, res) => {
  try {
    const result = await productSummaryStatsService();

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

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

export const updateProductStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.query;
    const { quantity, notes, price } = req.body;

    // 🔥 assume user is from auth middleware
    const handledBy = req.user.id; // ✅ get logged-in user

    // 🔥 Validation
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!action || !["IN", "OUT"].includes(action)) {
      return res.status(400).json({ message: "Invalid action (IN or OUT)" });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than 0",
      });
    }

    if (!price || price < 0) {
      return res.status(400).json({
        message: "Price is required and must be >= 0",
      });
    }

    if (!handledBy) {
      return res.status(401).json({
        message: "Unauthorized: user not found",
      });
    }

    const result = await updateProductStockService({
      id: Number(id),
      action,
      quantity: Number(quantity),
      notes,
      handledBy, // ✅ added
      price: Number(price), // ✅ added
    });

    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: `Stock ${action === "IN" ? "added" : "deducted"} successfully`,
      data: result,
    });
  } catch (error) {
    console.error(error);

    // 🔥 better error handling
    if (error.message === "Insufficient stock") {
      return res.status(400).json({ message: error.message });
    }

    if (error.message === "Invalid action type") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Failed to update stock",
    });
  }
};
