import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Authentication";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
