import { Shield } from "lucide-react";
import React from "react";

const OrderSummary = ({ subtotal, shippingCost, total }: any) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
          Order Summary
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">₱{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="text-gray-900">
              {shippingCost === 0
                ? "Free"
                : `₱${shippingCost.toLocaleString()}`}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              ₱{total.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3.5 h-3.5" />
            <span>Secure checkout. Your info is protected.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
