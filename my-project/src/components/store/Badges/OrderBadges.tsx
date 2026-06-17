import React from "react";
import {
  Package,
  Truck,
  Clock,
  XCircle,
  RotateCcw,
  CheckCircle,
  Star,
} from "lucide-react";
import type { OrderType } from "../../../types/order.types";

export const getStatusBadge = (status: string) => {
  const normalizedStatus = status?.toLowerCase();
  switch (normalizedStatus) {
    case "pending":
    case "to_pay":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: <Clock size={14} />,
        label: "Pending",
      };
    case "processing":
    case "to_ship":
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: <Package size={14} />,
        label: "Processing",
      };
    case "shipped":
    case "to_receive":
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        icon: <Truck size={14} />,
        label: "Shipped",
      };
    case "delivered":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <CheckCircle size={14} />,
        label: "Delivered",
      };
    case "completed":
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <CheckCircle size={14} />,
        label: "Completed",
      };
    case "returned":
    case "return_refund":
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: <RotateCcw size={14} />,
        label: "Returned",
      };
    case "cancelled":
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: <XCircle size={14} />,
        label: "Cancelled",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        icon: <Package size={14} />,
        label: status || "Unknown",
      };
  }
};

export type OrderActionHandlers = {
  onCancel: (order: OrderType) => void;
  onReturn: (order: OrderType) => void;
  onReview: (order: OrderType) => void;
};

export const getActionButtons = (
  order: OrderType,
  handlers: OrderActionHandlers
) => {
  const status = (order.orderStatus || order.status)?.toLowerCase();
  switch (status) {
    case "pending":
    case "to_pay":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
            Pay Now
          </button>
          <button
            onClick={() => handlers.onCancel(order)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      );
    case "to_ship":
    case "processing":
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handlers.onCancel(order)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel Order
          </button>
        </div>
      );
    case "shipped":
    case "to_receive":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
            Confirm Receipt
          </button>
          <button
            onClick={() => handlers.onReturn(order)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Request Return
          </button>
        </div>
      );
    case "delivered":
      return (
        <div className="flex gap-2">
          <button
            onClick={() => handlers.onReview(order)}
            className="px-4 py-2 border border-yellow-400 text-yellow-600 rounded-lg text-sm hover:bg-yellow-50 transition-colors flex items-center gap-1"
          >
            <Star size={14} />
            Write Review
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Buy Again
          </button>
        </div>
      );
    case "completed":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">
            Buy Again
          </button>
        </div>
      );
    case "return_refund":
      return (
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 transition-colors">
            Track Return
          </button>
        </div>
      );
    default:
      return null;
  }
};
