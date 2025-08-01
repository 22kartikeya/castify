import dotenv from 'dotenv';
dotenv.config();

export const base_backend_url = process.env.BASE_BACKEND_URL;
export const user_api_url = process.env.USER_API_URL;
export const admin_api_url = process.env.ADMIN_API_URL;
