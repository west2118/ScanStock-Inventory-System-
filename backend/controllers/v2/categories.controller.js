import {
  deleteCategoryService,
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  getChildCategoriesService,
} from "../../services/category.service.js";
import { asyncHandler } from "../../utils/helper.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await createCategoryService(req.validatedBody);

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await getCategoriesService();

  res.status(200).json([
    {
      id: "all",
      name: "All Categories",
      count: categories.reduce((sum, category) => sum + category.count, 0),
    },
    ...categories,
  ]);
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await getCategoryByIdService(req.params.id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    data: category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await updateCategoryService(
    req.params.id,
    req.validatedBody,
  );

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await deleteCategoryService(req.params.id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export const getChildCategories = asyncHandler(async (req, res) => {
  const categories = await getChildCategoriesService();

  return res.status(200).json({
    success: true,
    categories,
  });
});
