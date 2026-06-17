import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    if (user.role === "customer") return <Navigate to="/" replace />;
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
