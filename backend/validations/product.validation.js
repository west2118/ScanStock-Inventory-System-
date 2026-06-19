import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().trim().min(1),
  barcode: z.string().trim().optional(),

  slug: z.string().optional().nullable(),

  productName: z.string().trim().min(2, "Product name is required").max(255),

  shortDescription: z.string().optional(),
  description: z.string().optional(),
  features: z.string().optional(),

  price: z.coerce.number().positive(),

  status: z.enum(["active", "inactive"]).optional(),

  categoryId: z.number().int().positive(),
  brandId: z.number().int().positive(),

  vatType: z.enum(["vatable", "non_vatable", "zero_rated"]).optional(),

  specifications: z
    .array(
      z.object({
        name: z.string().trim().min(1),
        value: z.string().trim().min(1),
      }),
    )
    .default([]),

  images: z
    .array(
      z.object({
        imageUrl: z.string().url(),
        sortOrder: z.number().int().optional(),
        isPrimary: z.boolean().optional(),
      }),
    )
    .default([]),
});

export const updateProductSchema = createProductSchema.partial();
