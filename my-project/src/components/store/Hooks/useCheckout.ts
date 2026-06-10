import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CheckoutResponse = {
  message: string;
  checkoutSessionId: string;
};

export const useCheckout = () => {
  const navigate = useNavigate();

  return useMutation<CheckoutResponse, Error>({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create checkout");
      }

      return data;
    },

    onSuccess: (data) => {
      navigate(`/checkout/${data.checkoutSessionId}`);
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
