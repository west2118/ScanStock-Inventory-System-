import { Truck, Shield, RotateCcw } from "lucide-react";
import type { CartItem } from "../../../utils/types";
import { pesoFormatter } from "../../../utils/utils";
import { useCheckout } from "../Hooks/useCheckout";

const CartOrderSummary = ({ cartItems }: { cartItems: CartItem[] }) => {
  const checkoutMutation = useCheckout();

  const subtotal = cartItems
    .filter((c) => c.isSelected)
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
          Order Summary
        </h3>

        {/* Total */}
        <div className="border-b border-gray-100 mt-2">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-900">
              Cart Total
            </span>
            <span className="text-2xl font-bold text-gray-900">
              {pesoFormatter.format(subtotal)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => checkoutMutation.mutate()}
          disabled={cartItems.filter(item => item.isSelected).length === 0 || checkoutMutation.isPending}
          className="w-full mt-5 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
        >
          Proceed to Checkout
        </button>

        {/* Delivery Info */}
        <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Truck className="w-3.5 h-3.5" />
            <span>Standard Delivery: 3-5 business days</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>7-day easy returns</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Shield className="w-3.5 h-3.5" />
            <span>100% genuine products</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOrderSummary;
