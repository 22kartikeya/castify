import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import Signup from "./pages/Signup"
import { AdminDashboard } from "./pages/AdminDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { EmployeeDashboard } from "./pages/EmployeeDashboard";
import { useAuthStore } from "./store/useAuthStore";
import { AuthRoutes } from "./components/AuthRoutes";
import { Unauthorized } from "./pages/Unauthorized";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { Loading } from "./components/ui/Loading";

function App() {
  const { role, email } = useAuthStore();
  const loading = useAuthCheck();

  if (loading) {
    return <Loading/>
  }

  return (
    <BrowserRouter>
      {!role && !email && <Navbar />}
      <Routes>
        <Route path="*" element={<Unauthorized />} />
        <Route
          path="/login"
          element={
            role && email ? <Navigate to={`/${role}Dashboard`} /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            role && email ? <Navigate to={`/${role}Dashboard`} /> : <Signup />
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <AuthRoutes requiredRole="admin">
              <AdminDashboard />
            </AuthRoutes>
          }
        />
        <Route
          path="/UserDashboard"
          element={
            <AuthRoutes requiredRole="user">
              <UserDashboard />
            </AuthRoutes>
          }
        />
        <Route
          path="/EmployeeDashboard"
          element={
            <AuthRoutes requiredRole="employee">
              <EmployeeDashboard />
            </AuthRoutes>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/"
          element={
            role && email ? <Navigate to={`/${role}Dashboard`} /> : <Landing />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
