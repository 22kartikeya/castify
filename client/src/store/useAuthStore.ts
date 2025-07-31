import { create } from "zustand";

interface AuthState {
    role: "admin" | "user" | "employee" | null;
    email: string | null;
    setAuth: (role: AuthState["role"], email: string) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    role: null,
    email: null,
    setAuth: (role, email) => set({role, email}),
    clearAuth: () => set({role: null, email: null})
}));