import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useProcessOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/process`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to process order");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["branch-orders-data"],
      });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
