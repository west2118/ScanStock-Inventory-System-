import React from "react";
import { dateFormatter, pesoFormatter } from "../../../utils/utils";
import { Edit, Eye } from "lucide-react";
import type { OrderType } from "../../../types/order.types";
import OrdersItemCard from "./OrdersItemCard";

type OrdersTableRowProps = {
  order: OrderType;
  selectedOrders: number[];
  dispatch: React.Dispatch<any>;
};

const OrdersTableRow = ({
  order,
  selectedOrders,
  dispatch,
}: OrdersTableRowProps) => {
  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={selectedOrders.includes(order.id)}
          className="w-4 h-4 rounded border-gray-300"
        />
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="font-mono text-sm font-medium text-gray-900">
            {order.orderNumber}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {dateFormatter(order.placedAt)}
          </p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {order.address.fullName}
          </p>
          <p className="text-xs text-gray-500">{order.address.email}</p>
          <p className="text-xs text-gray-400">{order.address.phone}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          {order.items.length > 0 && <OrdersItemCard key={order.items[0].id} item={order.items[0]} />}
          {order.items.length > 1 && (
            <p className="text-xs text-gray-500 mt-1">
              + {order.items.length - 1} more item(s)
            </p>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <p className="font-bold text-gray-900">
          {pesoFormatter.format(order.totalAmount)}
        </p>
        <p className="text-xs text-gray-400">{order.items.length} item(s)</p>
      </td>
      <td className="py-3 px-4 text-center">
        <div>
          <span
            className={`inline-flex px-2 py-1 text-xs rounded-full capitalize ${getPaymentStatusBadge(order.paymentStatus)}`}
          >
            {order.paymentStatus}
          </span>
          <p className="text-xs text-gray-400 mt-1 capitalize">{order.paymentMethod}</p>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <span
          className={`inline-flex px-2 py-1 text-xs rounded-full capitalize ${getOrderStatusBadge(order.orderStatus)}`}
        >
          {order.orderStatus}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() =>
              dispatch({
                type: "OPEN_DETAILS",
                payload: order,
              })
            }
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>

          {order.orderStatus === "pending" && (
            <button
              onClick={() =>
                dispatch({
                  type: "OPEN_PROCESS",
                  payload: order,
                })
              }
              className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              Mark as Processing
            </button>
          )}

          {order.orderStatus === "processing" && (
            <button
              onClick={() =>
                dispatch({
                  type: "OPEN_SHIP",
                  payload: order,
                })
              }
              className="px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
            >
              Mark as Shipped
            </button>
          )}

          {order.orderStatus === "shipped" && (
            <button
              onClick={() =>
                dispatch({
                  type: "OPEN_DELIVER",
                  payload: order,
                })
              }
              className="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              Mark as Delivered
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableRow;
