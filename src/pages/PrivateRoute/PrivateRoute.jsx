import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";

export default function PrivateRoute() {
  const { user, initialLoading } = useAuthContext();

  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");

  if (initialLoading) return null;

  if (!user && !initialLoading) {
    return <Navigate to="/login" replace />;
  }

  if (!initialLoading && isAdminRoute && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
