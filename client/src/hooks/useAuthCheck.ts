import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import axios from "axios";
import type { responseDataShape } from "../types";
import { base_backend_url } from "../config";

export const useAuthCheck = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuth = async () => {
        try {
            const res = await axios.get<responseDataShape>(`${base_backend_url}/me`, {
            withCredentials: true,
            });
            const { email, role } = res.data;
            setAuth(role, email);
        } catch (e) {
            console.log("Error :", e);
        } finally {
            setLoading(false);
        }
        };
        fetchAuth();
    }, [setAuth]);
    return loading;
};
