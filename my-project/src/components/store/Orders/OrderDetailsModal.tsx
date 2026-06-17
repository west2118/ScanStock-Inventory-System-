import React from "react";
import { XCircle, CheckCircle, Truck, PackageCheck, MapPin } from "lucide-react";
import Modal from "../../Admin/UI/Modal";
import type { OrderType } from "../../../types/order.types";
import { dateFormatter, pesoFormatter } from "../../../utils/utils";

type OrderDetailsModalProps = {
  selectedOrder: OrderType;
  onClose: () => void;
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  selectedOrder,
  onClose,
}) => {
  if (!selectedOrder) return null;

  const status = selectedOrder.orderStatus?.toLowerCase() || "";

  return (
    <Modal
      isModalOpen={true}
      isCloseModal={onClose}
      width="max-w-3xl"
      title={
        <div>
          Order Details
          <p className="text-sm font-normal text-gray-500 font-mono mt-1">
            {selectedOrder.orderNumber}
          </p>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Order Status Timeline */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={16} className="text-white" />
              </div>
              <p className="text-xs text-gray-600 mt-1">Order Placed</p>
              <p className="text-xs text-gray-400">
                {dateFormatter(selectedOrder.placedAt)}
              </p>
            </div>
            <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                  status !== "cancelled" && status !== "pending" && status !== "to_pay" ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {status !== "cancelled" ? (
                  <CheckCircle size={16} className="text-white" />
                ) : (
                  <XCircle size={16} className="text-white" />
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">Processing</p>
              <p className="text-xs text-gray-400">
                {selectedOrder.history?.find(h => h.newStatus === "processing") ? dateFormatter(selectedOrder.history.find(h => h.newStatus === "processing")!.createdAt) : ""}
              </p>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${status === "shipped" || status === "delivered" || status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                  status === "shipped" || status === "delivered" || status === "completed"
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                <Truck size={16} className="text-white" />
              </div>
              <p className="text-xs text-gray-600 mt-1">Shipped</p>
              <p className="text-xs text-gray-400">
                {selectedOrder.history?.find(h => h.newStatus === "shipped") ? dateFormatter(selectedOrder.history.find(h => h.newStatus === "shipped")!.createdAt) : ""}
              </p>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${status === "delivered" || status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            <div className="text-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                  status === "delivered" || status === "completed" ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <PackageCheck size={16} className="text-white" />
              </div>
              <p className="text-xs text-gray-600 mt-1">Delivered</p>
              <p className="text-xs text-gray-400">
                {selectedOrder.history?.find(h => h.newStatus === "delivered" || h.newStatus === "completed") ? dateFormatter(selectedOrder.history.find(h => h.newStatus === "delivered" || h.newStatus === "completed")!.createdAt) : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Items</h4>
          <div className="space-y-3">
            {selectedOrder.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-3 border-b border-gray-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {pesoFormatter.format(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={16} />
            Shipping Information
          </h4>
          <p className="text-sm text-gray-700">
            {selectedOrder.address.fullName}
          </p>
          <p className="text-sm text-gray-600">
            {selectedOrder.address.addressLine}
          </p>
          <p className="text-sm text-gray-600">
            {selectedOrder.address.barangay}, {selectedOrder.address.city},{" "}
            {selectedOrder.address.province} {selectedOrder.address.postalCode}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            📞 {selectedOrder.address.phone}
          </p>

          {selectedOrder.deliveryMethod && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">Delivery Method</p>
              <p className="text-sm font-medium text-gray-900">
                {selectedOrder.deliveryMethod}
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal</span>
              <span>{pesoFormatter.format(selectedOrder.subtotal)}</span>
            </div>
            {selectedOrder.shippingFee > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shipping</span>
                <span>{pesoFormatter.format(selectedOrder.shippingFee)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-t border-gray-100">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                {pesoFormatter.format(selectedOrder.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {status === "pending" || status === "to_pay" ? "Pay Now" : "Track Order"}
        </button>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
