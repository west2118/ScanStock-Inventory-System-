// CheckoutPage.jsx
import { useState } from "react";
import OrderPlaced from "./OrderPlaced";
import OrderSummary from "../../components/store/Checkout/OrderSummary";
import { deliveryMethods } from "../../utils/constants";
import { useForm } from "../../hooks/useForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type CheckoutItem, type CheckoutFormData } from "../../utils/types";
import { fetchData } from "../../utils/utils";
import { useParams } from "react-router-dom";
import CheckoutSteps from "../../components/store/Checkout/CheckoutSteps";
import CheckoutContent from "../../components/store/Checkout/CheckoutContent";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { formData, setField } = useForm<CheckoutFormData>({
    address: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine: "",
      barangay: "",
      city: "",
      province: "",
      postalCode: "",
      landmark: "",
    },

    deliveryMethod: "standard",
    paymentMethod: "cod",
    notes: "",
    discountAmount: 0,
  });

  const { data: items } = useQuery<CheckoutItem[]>({
    queryKey: ["checkout-session-data", id],
    queryFn: fetchData(
      `${import.meta.env.VITE_API_URL}/checkout-sessions/${id}`,
    ),
    enabled: !!id,
  });

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setField("address", {
      ...formData.address,
      [name]: value,
    });
  };

  const shippingFee = deliveryMethods.find(
    (d) => d.id === formData.deliveryMethod,
  )?.price;

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (
          !formData.address.firstName ||
          !formData.address.lastName ||
          !formData.address.email ||
          !formData.address.phone ||
          !formData.address.addressLine ||
          !formData.address.barangay ||
          !formData.address.city ||
          !formData.address.province
        ) {
          toast.error("Please complete your shipping address.");
          return false;
        }
        return true;

      case 2:
        if (!formData.deliveryMethod) {
          toast.error("Please select a delivery method.");
          return false;
        }
        return true;

      case 3:
        if (!formData.paymentMethod) {
          toast.error("Please select a payment method.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        ...formData,
        items,
        shippingFee,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      return data;
    },

    onSuccess: () => {
      setOrderPlaced(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      queryClient.invalidateQueries({
        queryKey: ["cart-data"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success("Order placed successfully");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmitOrder = () => {
    createOrderMutation.mutate();
  };

  if (orderPlaced) {
    return <OrderPlaced />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicators */}
        <CheckoutSteps currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <CheckoutContent
            cartItems={items ?? []}
            currentStep={currentStep}
            formData={formData}
            setField={setField}
            handleAddressChange={handleAddressChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            handleSubmitOrder={handleSubmitOrder}
          />

          {/* Order Summary - Right Column */}
          <OrderSummary
            cartItems={items ?? []}
            shippingFee={shippingFee ?? 0}
            discount={formData.discountAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
