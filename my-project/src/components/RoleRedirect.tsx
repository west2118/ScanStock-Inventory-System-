import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDefaultRouteByRole } from "../utils/utils";

const RoleRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const role = user.role?.toLowerCase();

    navigate(getDefaultRouteByRole(role) || "/", { replace: true });
  }, [user, loading, navigate]);

  return null;
};

export default RoleRedirect;
