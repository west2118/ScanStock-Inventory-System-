import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type ShipOrderPayload = {
  orderId: number;
  trackingNumber: string;
  courierName: string;
};

export const useShipOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, trackingNumber, courierName }: ShipOrderPayload) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/${orderId}/ship`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trackingNumber, courierName }),
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to ship order");
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
