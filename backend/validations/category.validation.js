import { z } from "zod";

export const createCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Category name must be at least 2 characters")
      .max(100, "Category name cannot exceed 100 characters"),
    parentId: z.number().int().positive().nullable().optional(),
    slug: z.string().optional().nullable(),
    status: z.enum(["active", "inactive"]).default("active"),
  })
  .strict();

export const updateCategorySchema = createCategorySchema.partial();
