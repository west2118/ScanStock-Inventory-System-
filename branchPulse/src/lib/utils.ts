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

export const formatDateWithTime = (date: string) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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

export const formatDifference = (difference: number, title: string) => {
  const sign = difference > 0 ? "+" : "";
  return `${sign}${difference} ${title}`;
};

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

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

export const fetchTableData =
  (url: string) =>
  async ({ queryKey }: { queryKey: any }) => {
    const [_key, filters] = queryKey;

    const query = createQueryString(filters);

    const response = await fetchWithAuth(`${url}?${query}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
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

export const formatPesoShort = (value: number) => {
  const num = Number(value || 0);

  if (num >= 1_000_000_000) return `₱${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `₱${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `₱${(num / 1_000).toFixed(1)}k`;

  return `₱${num}`;
};

export const getDefaultRoute = (role: string) => {
  if (role === "admin") return `/${role}`;
  if (role === "cashier") return `/${role}/point-of-sale`;
  return `/${role}/inventory/dashboard`;
};

export const createQueryString = (params: any) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
};
