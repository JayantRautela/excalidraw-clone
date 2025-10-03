import { z } from "zod";

export const signupSchema = z.object({
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "Password must contain atleast 6 characters").max(12, "Password cannot be of more than 12 characters"),
    name: z.string("Name cannot be empty")
});
// TODO: add field for profile photo url

export const signinSchema = z.object({
    email: z.email("Invalid Email Address"),
    password: z.string("Password is required")
});