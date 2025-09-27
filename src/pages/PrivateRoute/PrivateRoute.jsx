import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuthContext();

  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");

  console.log(isAdminRoute);
  console.log("loading user =>", loading);

  if (loading) return null;

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  if (!loading && isAdminRoute && user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
