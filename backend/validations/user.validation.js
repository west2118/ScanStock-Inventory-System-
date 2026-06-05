import { z } from "zod";

const userStatus = ["active", "inactive", "suspended"];
const userRoles = ["super_admin", "admin", "manager", "staff", "customer"];
const providers = ["local", "google", "facebook"];

export const baseUserSchema = z.object({
  branchId: z.number().int().positive().optional(),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name cannot exceed 100 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(255),

  provider: z.enum(providers).default("local"),

  providerId: z.string().max(255).optional(),

  status: z.enum(userStatus).default("active"),

  role: z.enum(userRoles).default("customer"),

  emailVerified: z.boolean().optional(),
});

export const registerSchema = baseUserSchema
  .extend({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const updateUserSchema = baseUserSchema
  .extend({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("Invalid email address"),

    password: z.string().min(1, "Password is required"),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(100),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .strict();

export const verifyEmailSchema = z
  .object({
    token: z.string().min(1, "Verification token is required"),
  })
  .strict();
