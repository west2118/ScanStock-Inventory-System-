import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity = 1, isBuyNow = false }: { productId: number; quantity?: number; isBuyNow?: boolean }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/carts/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity, isBuyNow }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add to cart");
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
