import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRemoveCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/carts/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to remove to cart");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-data"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart-count"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
