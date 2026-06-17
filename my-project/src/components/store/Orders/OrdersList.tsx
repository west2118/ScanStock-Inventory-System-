import React from "react";
import OrderListCard from "./OrderListCard";
import type { OrderType } from "../../../types/order.types";

type OrdersListProps = {
  orders: OrderType[];
  getStatusBadge: any;
  getActionButtons: any;
  onViewDetails: (order: OrderType) => void;
};

const OrdersList = ({
  orders,
  getStatusBadge,
  getActionButtons,
  onViewDetails,
}: OrdersListProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderListCard
          key={order.id}
          order={order}
          getStatusBadge={getStatusBadge}
          getActionButtons={getActionButtons}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default OrdersList;
