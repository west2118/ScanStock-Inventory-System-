import { Shield } from "lucide-react";
import type { CheckoutItem } from "../../../utils/types";
import { pesoFormatter } from "../../../utils/utils";

type OrderSummaryProps = {
  cartItems: CheckoutItem[];
  shippingFee: number;
  discount: number;
};

const OrderSummary = ({
  cartItems,
  shippingFee,
  discount,
}: OrderSummaryProps) => {
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const total = subtotal + shippingFee;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
        <h3 className="text-base font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
          Order Summary
        </h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">
              {pesoFormatter.format(subtotal)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Shipping</span>
            <span className="text-gray-900">
              {shippingFee === 0
                ? "Free"
                : `${pesoFormatter.format(shippingFee)}`}
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Discount Code
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Apply
              </button>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">Discount Applied</span>
              <span className="font-medium text-green-600">
                -{pesoFormatter.format(discount)}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              {pesoFormatter.format(total)}
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
