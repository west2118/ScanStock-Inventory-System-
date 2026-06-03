import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "central_admin") {
      navigate("/admin");
    } else if (user.role === "cashier") {
      navigate("/admin/point-of-sale");
    } else {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return null;
};

export default RoleRedirect;
