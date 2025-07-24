import { z } from 'zod';
import { Roles } from '../types';

export const broadcastSchema = z.object({
    title: z.string().min(1).max(30),
    message: z.string().min(1).max(250),
    role: z.enum([Roles.ADMIN, Roles.USER, Roles.EMPLOYEE]),
    type: z.enum(['popup', 'banner']).default('banner'),
    status: z.enum(['active', 'expired']).default('active')
});