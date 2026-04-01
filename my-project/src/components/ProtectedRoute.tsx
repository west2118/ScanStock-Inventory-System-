import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteByRole } from "../utils/utils";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  const role = user.role?.toLowerCase();

  if (!allowedRoles.includes(role)) {
    return <Navigate to={getDefaultRouteByRole(role) || "/"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
