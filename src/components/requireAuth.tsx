import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserRole } from "../context/useUserRole";

export function RequireAuth() {
  const location = useLocation();
  const { user } = useUserRole();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function RoleProtected({ allowedRoles }: { allowedRoles: ("student" | "placementOfficer" | "admin")[] }) {
  const { user, role } = useUserRole();
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}