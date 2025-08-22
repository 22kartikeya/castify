import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import type { AuthRouteProps } from "../types";

export const AuthRoutes = ({children, requiredRole}: AuthRouteProps) => {
    // primitive selectors are being used here to avoid re-renders
    // therefore no loop
    const email = useAuthStore(state => state.email);
    const role = useAuthStore(state => state.role);
    if(!email) return <Navigate to="/login"/>
    if(requiredRole && role !== requiredRole) return <Navigate to="/unauthorized"/>
    return <>{children}</>
}