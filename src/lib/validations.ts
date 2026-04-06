import { z } from "zod";

/** Login Form Schema */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(6, "Kata sandi minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/** Register Form Schema */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nama lengkap wajib diisi")
    .min(2, "Nama minimal 2 karakter"),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[a-zA-Z]/, "Harus mengandung huruf")
    .regex(/[0-9]/, "Harus mengandung angka"),
  agreeToTerms: z
    .boolean()
    .refine(val => val === true, "Anda harus menyetujui syarat & ketentuan"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/** Onboarding Step 1: Profile */
export const onboardingStep1Schema = z.object({
  fullName: z.string().min(1, "Nama lengkap wajib diisi"),
  businessRole: z.string().optional(),
});

export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>;

/** Onboarding Step 2: Store */
export const onboardingStep2Schema = z.object({
  storeName: z
    .string()
    .min(1, "Nama toko wajib diisi")
    .min(3, "Nama toko minimal 3 karakter")
    .max(50, "Nama toko maksimal 50 karakter"),
  storeSlug: z
    .string()
    .min(1, "URL Toko wajib diisi")
    .min(3, "URL minimal 3 karakter")
    .max(30, "URL maksimal 30 karakter")
    .regex(/^[a-z0-9-]+$/, "Hanya huruf kecil, angka, dan tanda hubung"),
  category: z.string().optional(),
});

export type OnboardingStep2Data = z.infer<typeof onboardingStep2Schema>;

/** Onboarding Step 3: WhatsApp */
export const onboardingStep3Schema = z.object({
  whatsapp: z
    .string()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(/^[0-9]+$/, "Hanya boleh berisi angka")
    .min(9, "Nomor WhatsApp tidak valid"),
});

export type OnboardingStep3Data = z.infer<typeof onboardingStep3Schema>;

/** Lupa Password Schema */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/** Reset Password Schema */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, "Kata sandi baru wajib diisi")
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[a-zA-Z]/, "Harus mengandung huruf")
    .regex(/[0-9]/, "Harus mengandung angka"),
  confirmPassword: z
    .string()
    .min(1, "Konfirmasi kata sandi wajib diisi"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Kata sandi tidak cocok",
  path: ["confirmPassword"],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/** Account: Change Email */
export const changeEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email baru wajib diisi")
    .email("Format email tidak valid"),
});

export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;

/** Account: Change Password */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Kata sandi saat ini wajib diisi"),
  newPassword: z
    .string()
    .min(1, "Kata sandi baru wajib diisi")
    .min(8, "Kata sandi minimal 8 karakter")
    .regex(/[a-zA-Z]/, "Harus mengandung huruf")
    .regex(/[0-9]/, "Harus mengandung angka"),
  confirmPassword: z
    .string()
    .min(1, "Konfirmasi kata sandi wajib diisi"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Kata sandi baru tidak cocok",
  path: ["confirmPassword"],
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

/** Category: Add Category */
export const addCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Nama kategori wajib diisi")
    .min(2, "Nama kategori minimal 2 karakter")
    .max(30, "Nama kategori maksimal 30 karakter"),
});

export type AddCategoryFormData = z.infer<typeof addCategorySchema>;

/** Product Management */
export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi").max(100, "Nama produk maksimal 100 karakter"),
  price: z.string().min(1, "Harga wajib diisi").regex(/^[0-9]+$/, "Hanya angka yang diperbolehkan"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
