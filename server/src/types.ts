import { Request } from "express";
import {z} from 'zod';
import { broadcastSchema } from './validations/broadcastValidation';

export enum Roles{
    USER = "user",
    EMPLOYEE= "employee",
    ADMIN= "admin"
}

export interface UserInterface {
    _id: Object,
    email: string,
    password: string,
    role: Roles
}

export interface AuthRequest extends Request {
  user?: {
    id: Object;
    role: Roles;
  };
}

export type customPayload = {
    id: Object;
    role: Roles;
}


export type broadcastType = z.infer<typeof broadcastSchema>;