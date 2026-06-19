import { z } from "zod";

export const createBrandSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Brand name must be at least 2 characters")
      .max(100, "Brand name cannot exceed 100 characters"),
    logoUrl: z.union([z.string().url("Invalid logo URL"), z.literal("")]).optional().nullable(),
    slug: z.string().optional().nullable(),
    status: z.enum(["active", "inactive"]).default("active"),
  })
  .strict();

export const updateBrandSchema = createBrandSchema.partial();
