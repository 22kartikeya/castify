import { create } from "zustand";

interface AuthState {
    role: string | null;
    email: string | null;
    setAuth: (role: string, email: string) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    role: null,
    email: null,
    setAuth: (role, email) => set({role, email}),
    clearAuth: () => set({role: null, email: null})
}));