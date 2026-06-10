import { ChevronLeft, Lock, Package } from "lucide-react";
import React from "react";

const ReviewOrder = ({
  cartItems,
  selectedSavedAddress,
  shippingAddress,
  deliveryMethods,
  deliveryMethod,
  paymentMethods,
  paymentMethod,
  handlePrevStep,
  handlePlaceOrder,
  handleSubmitOrder,
}: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Review Order</h2>
      </div>

      {/* Order Items Summary */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Items</h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-2 border-b border-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">{item.brand}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ₱{item.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Info Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Shipping Information</h3>
        <p className="text-sm text-gray-600">
          {selectedSavedAddress?.address ||
            `${shippingAddress.address}, ${shippingAddress.city}`}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {deliveryMethods.find((m) => m.id === deliveryMethod)?.name}
        </p>
      </div>

      {/* Payment Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
        <p className="text-sm text-gray-600">
          {paymentMethods.find((m) => m.id === paymentMethod)?.name}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handlePrevStep}
          className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleSubmitOrder}
          className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default ReviewOrder;
