import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const mongo_url = process.env.MONGO_URI || "";
export const frontend_url = process.env.FRONTEND_URL || "";

export const secrets = {
    admin: process.env.ADMIN_SECRET || "",
    user: process.env.USER_SECRET || "",
    employee: process.env.EMPLOYEE_SECRET || ""
};