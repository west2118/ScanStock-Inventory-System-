import { ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-50 p-5">
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="w-10 h-10 text-gray-300 mb-3" />

        <p className="text-base font-medium text-gray-900">
          No items in your cart
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Add products to start your checkout.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
