import {z} from 'zod';

export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(4, {message: "Password is too short"}).max(128, {message: "Password is too long"}),
    role: z.enum(["admin", "user", "employee"])
});

export type SignupType = z.infer<typeof signupSchema>;