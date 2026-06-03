import { Navigate, useParams } from "react-router-dom";
import { getDefaultRoute } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { role } = useParams();

  if (loading) return null;

  if (!user) return <Navigate to="/" replace />;

  const redirectPath = getDefaultRoute(user.role);

  if (role && role !== user.role) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
