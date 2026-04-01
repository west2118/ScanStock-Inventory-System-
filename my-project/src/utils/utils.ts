import type { ProductType } from "./types";

export const refreshAccessToken = async () => {
  const res = await fetch("http://localhost:5001/api/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Refresh token expired");
  }
};

export const fetchData =
  (url: string, withParams = false) =>
  async ({ queryKey }: { queryKey: any }) => {
    const [_key, param] = queryKey;
    const finalUrl = withParams ? `${url}/${param}` : url;

    const response = await fetchWithAuth(finalUrl);

    if (!response.ok) {
      throw new Error("Unauthorized");
    }

    return response.json();
  };

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    await refreshAccessToken();

    response = await fetch(url, {
      ...options,
      credentials: "include",
    });
  }

  return response;
};

export const getStockStatus = (product: {
  id: number;
  stock: number;
  stockLow: number;
  stockCritical: number;
  stockHigh?: number;
}) => {
  const stock = product.stock;

  // 🔴 Out of Stock
  if (stock === 0) {
    return {
      label: "Out of Stock",
      color: "bg-red-100 text-red-800",
      textColor: "text-red-600",
      background: "bg-red-600",
      colorFill: "#dc2626",
    };
  }

  // 🟠 Critical
  if (stock <= product.stockCritical) {
    return {
      label: "Critical",
      color: "bg-orange-100 text-orange-800",
      textColor: "text-orange-600",
      background: "bg-orange-500",
      colorFill: "#f97316",
    };
  }

  // 🟡 Low
  if (stock <= product.stockLow) {
    return {
      label: "Low",
      color: "bg-yellow-100 text-yellow-800",
      textColor: "text-yellow-600",
      background: "bg-yellow-400",
      colorFill: "#facc15",
    };
  }

  // 🔵 High
  if ((product.stockHigh ?? 0) > 0 && stock >= (product.stockHigh ?? 0)) {
    return {
      label: "High",
      color: "bg-blue-100 text-blue-800",
      textColor: "text-blue-600",
      background: "bg-blue-500",
      colorFill: "#3b82f6",
    };
  }

  // 🟢 Normal
  return {
    label: "In Stock",
    color: "bg-green-100 text-green-800",
    textColor: "text-green-600",
    background: "bg-green-600",
    colorFill: "#16a34a",
  };
};

export const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

export const capitalizeFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const dateFormatter = (createdAt: string) => {
  const date = new Date(createdAt);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const timeFormatter = (createdAt: string) => {
  const date = new Date(createdAt);

  return date.toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

import { Plus, Minus } from "lucide-react";

export const getMovementUI = (type: string) => {
  if (type === "IN") {
    return {
      textColor: "text-green-500",
      className: "bg-green-100 text-green-700",
      icon: Plus,
      label: "Stock In",
    };
  }

  return {
    textColor: "text-red-500",
    className: "bg-red-100 text-red-700",
    icon: Minus,
    label: "Stock Out",
  };
};

export const formatNumber = (value: number) => {
  const num = Number(value || 0);

  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;

  return num;
};

export const getDefaultRouteByRole = (role: string) => {
  const normalized = role.toLowerCase() as "admin" | "staff";

  const routes = {
    admin: "/admin",
    staff: "/staff/scan",
  };

  return routes[normalized] || "/";
};
