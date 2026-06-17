import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useMinusCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/carts/minus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to minus to cart");
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
