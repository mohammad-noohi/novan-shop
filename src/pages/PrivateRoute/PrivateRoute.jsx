import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../contexts/AuthContext/useAuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuthContext();

  /* if (loading) {
    // هنوز اطلاعات کاربر لود نشده → می‌تونی Loader یا null بذاری
    return null;
  } else if (!user) {
    // کاربر لاگین نکرده
    return <Navigate to="/login" replace />;
  } else if (user.role !== "admin") {
    // کاربر لاگین کرده اما role اشتباهه
    return <Navigate to="/login" replace />;
  } else {
    // همه چیز اوکیه
    return <Outlet />;
  } */

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
