import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().min(1, "Barcode is required"),
  product_name: z.string().min(1, "Product name is required"),

  // 🔥 use coerce (VERY IMPORTANT for forms)
  price: z.coerce.number().min(1, "Price must be greater than 0"),

  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),

  vat_type: z.enum(["vatable", "vat_exempt", "zero_rated"]),

  stock: z.coerce.number().min(0),
  stock_low: z.coerce.number().min(0),
  stock_critical: z.coerce.number().min(0),
  stock_high: z.coerce.number().min(0),
});

export const updateProductSchema = createProductSchema.partial();
