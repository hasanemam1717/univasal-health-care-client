import { z } from "zod";

export const patientRegisterSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  patient: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters"),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
