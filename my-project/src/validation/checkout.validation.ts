import { z } from "zod";

// Schema for Step 1: Shipping Address
export const shippingAddressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  addressLine: z.string().min(1, "Address line is required"),
  barangay: z.string().min(1, "Barangay is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().optional(),
  landmark: z.string().optional(),
});

// Schema for Step 2: Delivery Method
export const deliveryMethodSchema = z.object({
  deliveryMethod: z.string().min(1, "Please select a delivery method"),
});

// Schema for Step 3: Payment Method
export const paymentMethodSchema = z.object({
  paymentMethod: z.string().min(1, "Please select a payment method"),
});
