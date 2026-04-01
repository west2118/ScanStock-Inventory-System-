import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, UserType } from "../utils/types.ts";
import { fetchWithAuth } from "../utils/utils.ts";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // ✅ ADD THIS

  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:5001/api/me");

      if (!response.ok) throw new Error();

      const data = await response.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (formData: any) => {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (!response.ok) {
      throw new Error("Login Failed");
    }

    const data = await response.json();

    setUser(data.user);

    return data.user;
  };

  const logout = async () => {
    await fetch("http://localhost:5001/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
