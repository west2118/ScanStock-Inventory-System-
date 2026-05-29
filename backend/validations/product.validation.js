import { z } from "zod";

export const createProductSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().min(1, "Barcode is required"),
  product_name: z.string().min(1, "Product name is required"),
  status: z.string().min(1, "Status is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  vat_type: z.enum(["vatable", "vat_exempt", "zero_rated"]),
});

export const updateProductSchema = createProductSchema.partial();
