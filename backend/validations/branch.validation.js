import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createBranchSchema = z
  .object({
    branchName: z
      .string()
      .trim()
      .min(2, "Branch name must be at least 2 characters")
      .max(100, "Branch name cannot exceed 100 characters"),

    branchCode: z
      .string()
      .trim()
      .min(2, "Branch code must be at least 2 characters")
      .max(100, "Branch code cannot exceed 100 characters"),

    branchType: z.enum(["store", "warehouse", "central_warehouse"], {
      errorMap: () => ({
        message: "Branch type must be store, warehouse, or central_warehouse",
      }),
    }),

    region: z
      .string()
      .trim()
      .min(2, "Region must be at least 2 characters")
      .max(255, "Region cannot exceed 255 characters"),

    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .max(255, "Address cannot exceed 255 characters"),

    status: z.enum(["active", "inactive", "archived"]).default("active"),

    openingTime: z
      .string()
      .regex(timeRegex, "Opening time must be in HH:MM format"),

    closingTime: z
      .string()
      .regex(timeRegex, "Closing time must be in HH:MM format"),
  })
  .strict();

export const updateBranchSchema = createBranchSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });
