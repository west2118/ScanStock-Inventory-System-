import { createContext, useContext, useEffect, useState } from "react";
import { fetchWithAuth } from "../lib/utils";
import type { AuthContextType, UserType } from "../lib/types";

type LoginCredentials = {
  username: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/me`,
      );

      if (!response.ok) throw new Error();

      const data = await response.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = async (formData: LoginCredentials) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message ?? "Login Failed");
    }

    setUser(data.user);

    return data.user;
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
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
