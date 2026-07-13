import { Eye, MapPin } from "lucide-react";
import {
  capitalizeFirst,
  dateFormatter,
  pesoFormatter,
} from "../../../utils/utils";
import type { OrderType } from "../../../types/order.types";
import OrdersItemCard from "./OrdersItemCard";

type OrderListCardProps = {
  order: OrderType;
  getStatusBadge: any;
  getActionButtons: any;
  onViewDetails: (order: OrderType) => void;
};

const OrderListCard = ({
  order,
  getStatusBadge,
  getActionButtons,
  onViewDetails,
}: OrderListCardProps) => {
  const statusBadge = getStatusBadge(order.orderStatus);

  return (
    <div
      key={order.id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Order Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono font-medium text-gray-900">
            {order.orderNumber}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Placed on</p>
          <p className="text-sm text-gray-900">
            {dateFormatter(order.placedAt)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-bold text-gray-900">
            {pesoFormatter.format(order.totalAmount)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="text-sm text-gray-900">
            {order.paymentMethod === "cod"
              ? order.paymentMethod.toUpperCase()
              : capitalizeFirst(order.paymentMethod)}
          </p>
        </div>
        <div>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${statusBadge?.bg} ${statusBadge?.text}`}
          >
            {statusBadge?.icon}
            {statusBadge?.label}
          </span>
        </div>
      </div>

      {/* Order Items */}
      <div className="divide-y divide-gray-100">
        {order.items.map((item) => (
          <OrdersItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Order Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={14} />
          <span>
            Shipping to: {order.address.fullName},{" "}
            {capitalizeFirst(order.address.city)}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(order)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-1"
          >
            <Eye size={14} />
            View Details
          </button>
          {getActionButtons(order)}
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
