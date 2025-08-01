import {z} from 'zod';

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4, {message: "Password is too short"}).max(128, {message: "Password is too long"})
});

export type LoginType = z.infer<typeof loginSchema>;