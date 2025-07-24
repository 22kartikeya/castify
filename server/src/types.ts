import { Request } from "express";

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