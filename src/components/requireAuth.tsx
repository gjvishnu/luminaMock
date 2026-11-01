import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux";
import { selectIsAuthenticated } from "../redux/authSlice";

export function RequireAuth() {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
