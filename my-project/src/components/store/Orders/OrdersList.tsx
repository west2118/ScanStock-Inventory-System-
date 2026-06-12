import React from "react";
import OrderListCard from "./OrderListCard";
import type { OrderType } from "../../../types/order.types";

type OrdersListProps = { orders: OrderType[]; getStatusBadge: any };

const OrdersList = ({ orders, getStatusBadge }: OrdersListProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderListCard order={order} getStatusBadge={getStatusBadge} />
      ))}
    </div>
  );
};

export default OrdersList;
