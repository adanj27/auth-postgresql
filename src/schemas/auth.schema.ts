import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z.string().min(2, "Name must be at least 2 characters"),
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});
