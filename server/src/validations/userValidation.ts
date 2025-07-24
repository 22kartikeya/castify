import {z} from 'zod';
import { Roles } from '../types';

export const signupSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(128),
    role: z.enum([Roles.USER, Roles.ADMIN, Roles.EMPLOYEE])
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(128)
})